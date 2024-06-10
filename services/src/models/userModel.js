import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import crypto from 'crypto';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'please provide first name'],
  },
  lastName: {
    type: String,
    required: [true, 'please provide last name'],
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        // Using a basic regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm the password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  verified: {
    type: Boolean,
    default: false,
  },

  photo: {
    type: String,
    default: null,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

const UserModel = model('User', userSchema);

export { UserModel as User };
