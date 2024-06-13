import express from 'express';
import { findSubdomains } from '../controllers/SubdomainFinderController.js';

const router = express.Router();

router.get('/find-subdomains', findSubdomains);

export default router;
