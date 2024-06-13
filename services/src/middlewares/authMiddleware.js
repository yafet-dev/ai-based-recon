import { promisify } from 'util';
import crypto from 'crypto';
import asyncError from '../utils/asyncError.js';
import AppError from '../utils/appError.js';
import { User } from '../models/userModel.js';
import sendEmail from '../utils/email.js';
import pkg from 'jsonwebtoken';
const { verify, sign } = pkg;

const signToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });
};

const createSendToken = (user, statusCode, res) => {
  if (user.verified) {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
    };

    res.cookie('token', token, cookieOptions);

    user.password = undefined;
    res.status(statusCode).json({
      status: 'success',
      data: {
        userId: user._id,
        user,
      },
    });
  } else {
    res.status(403).json({
      status: 'failed',
      message: 'please verify your account',
    });
  }
};

export const signup = asyncError(async (req, res, next) => {
  const lengthOfUsers = await User.countDocuments();
  if (lengthOfUsers === 0) {
    req.body.role = 'owner';
    req.body.approved = true;
  } else {
    req.body.role = 'admin';
    req.body.approved = false;
  }

  const existingUnverifiedUser = await User.findOne({
    email: req.body.email,
    verified: false,
  });

  if (existingUnverifiedUser) {
    await User.deleteOne({ _id: existingUnverifiedUser._id });
  }

  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
    approved: req.body.approved,
    verified: false,
  });

  const resetToken = newUser.createPasswordResetToken();
  await newUser.save({ validateBeforeSave: false });

  const verificationURL = `${process.env.FRONTEND_URL}/verify/${resetToken}`;

  const message = `Welcome to ai-recon, click the link to verify your email: ${verificationURL}.\nIf you didn't signup, please ignore this email!`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: 'account verification (valid for an hour)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: `we have sent a verification email to ${req.body.email}, please verify your account`,
    });
  } catch (err) {
    await newUser.deleteOne({ email: req.body.email });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

export const verification = asyncError(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.verified = true;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save({ validateBeforeSave: false });

  if (user.approved) return createSendToken(user, 200, res);

  res.status(200).json({
    status: 'success',
    message: 'You have signed up successfully',
  });
});

export const signin = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

export const protect = asyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  const decoded = await promisify(verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};

export const forgotPassword = asyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with this email address.', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for an hour)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: `we have sent a verification token to ${req.body.email}`,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

export const resetPassword = asyncError(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

export const updatePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  createSendToken(user, 200, res);
});

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
