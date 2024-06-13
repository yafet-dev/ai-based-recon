import express from 'express';
import { bxssListener } from '../controllers/BxssHunterController.js';

const router = express.Router();

router.get('/bxss-listener', bxssListener);

export default router;
