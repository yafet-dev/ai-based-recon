import express from 'express';
import { testXss } from '../controllers/XssHunterController.js';

const router = express.Router();

router.get('/test-xss', testXss);

export default router;
