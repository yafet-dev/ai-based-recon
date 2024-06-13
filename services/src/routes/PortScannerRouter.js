import express from 'express';
import { scanPorts } from '../controllers/PortScannerController.js';

const router = express.Router();

router.get('/scan-ports', scanPorts);

export default router;
