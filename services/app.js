import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import AppError from './src/utils/appError.js';
import adminRoute from './src/routes/userRoute.js';
import subDomainFinder from './src/routes/subDomainFinderRoute.js';
import portScanner from './src/routes/portScannerRoute.js';

dotenv.config();

// Define __filename and __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Default route

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', adminRoute);
app.use('/api/subdomainfinder', subDomainFinder);
app.use('/api/portScanner', portScanner);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Catch all route for undefined routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export default app;
