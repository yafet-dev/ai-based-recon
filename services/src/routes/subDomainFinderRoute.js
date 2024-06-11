import express from 'express';
import { exec } from 'child_process';
import { protect } from '../middlewares/authMiddleware.js';
import asyncError from '../utils/asyncError.js';

const subDomainFinder = express.Router();

const subFind = asyncError(async (req, res, next) => {
  const domain = req.query.domain;

  if (!domain) {
    return res.status(400).send('Domain parameter is required');
  }

  // Execute Assetfinder command
  exec(`assetfinder ${domain}`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Server error: ${error.message}`);
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`Server error: ${stderr}`);
    }

    const subdomains = stdout.split('\n').filter((subdomain) => subdomain);

    const checksubdomain = await checkSubdomains(subdomains);
    res.status(200).json({ checksubdomain });
  });
});

const checkSubdomains = async (subdomains) => {
  const results = await Promise.all(
    subdomains.map(async (subdomain) => {
      try {
        const response = await axios.get(`https://${subdomain}`);
        console.log(response);
        return { subdomain, status: response.status };
      } catch (error) {
        // If there is an error (e.g., the subdomain is unreachable), return a status of 0
        return {
          subdomain,
          status: error.response ? error.response.status : 0,
        };
      }
    }),
  );
  return results;
};

subDomainFinder.get('/yafet', protect, subFind);

export default subDomainFinder;
