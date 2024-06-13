import express from 'express';
import {
  bxssListener,
  getXssResults,
} from '../controllers/BxssHunterController.js';

const router = express.Router();

router.get('/bxss-listener', bxssListener);
router.get('/xss-results', getXssResults);

export default router;
