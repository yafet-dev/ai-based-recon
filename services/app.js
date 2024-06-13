import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import PortScannerRouter from './src/routes/PortScannerRouter.js';
import errorHandler from './src/middlewares/errorMiddleware.js';
import AppError from './src/utils/appError.js';
import adminRoute from './src/routes/userRoute.js';
import subDomainFinder from './src/routes/SubdomainFinderRouter.js';
import xssHunterRouter from './src/routes/xssHunterRouter.js';
import bxssHunterRouter from './src/routes/bxssHunterRouter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', adminRoute);
app.use('/api/subdomainfinder', subDomainFinder);
app.use('/api/portScanner', PortScannerRouter);
app.use('/api/xsshunter', xssHunterRouter);
app.use('/api/bxsshunter', bxssHunterRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
