import mongoose from 'mongoose';

const capturedCookieSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cookie: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const CapturedCookieModel = mongoose.model(
  'CapturedCookie',
  capturedCookieSchema,
);

export default CapturedCookieModel;
