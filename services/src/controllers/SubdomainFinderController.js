import { exec } from 'child_process';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getStatusCode = (url) => {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, (res) => {
      resolve(res.statusCode);
    });

    req.on('error', () => {
      resolve(404); // Resolve with 404 if there's an error
    });

    req.end();
  });
};

export const findSubdomains = async (req, res) => {
  const domain = req.query.domain;

  if (!domain) {
    return res.status(400).send('Domain parameter is required');
  }

  // Execute Assetfinder command
  exec(`assetfinder --subs-only ${domain}`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Server error: ${error.message}`);
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`Server error: ${stderr}`);
    }

    // Process the output and filter unique subdomains
    const subdomains = stdout.split('\n').filter((subdomain) => subdomain);
    const uniqueSubdomains = [...new Set(subdomains)];

    // Get status codes for each subdomain
    const subdomainsWithStatus = await Promise.all(
      uniqueSubdomains.map(async (subdomain) => {
        const url = `http://${subdomain}`;
        const statusCode = await getStatusCode(url);
        return { subdomain, statusCode };
      }),
    );

    // Save subdomains to a text file
    const filePath = path.join(__dirname, 'subdomains.txt');

    // Delete the old subdomains.txt file if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    fs.writeFileSync(filePath, uniqueSubdomains.join('\n'));

    // Run the subzy command
    exec(
      `subzy run --targets "${filePath}"`,
      (subzyError, subzyStdout, subzyStderr) => {
        if (subzyError) {
          console.error(`exec error: ${subzyError}`);
          return res.status(500).send(`Server error: ${subzyError.message}`);
        }

        if (subzyStderr) {
          console.error(`stderr: ${subzyStderr}`);
          return res.status(500).send(`Server error: ${subzyStderr}`);
        }

        // Parse the subzy output
        const subzyResults = subzyStdout.split('\n').reduce((acc, line) => {
          const parts = line.split(' - ');
          if (parts.length !== 2) return acc;

          const statusText = parts[0].trim();
          const subdomain = parts[1].trim();
          let takeoverStatus = 'UNKNOWN';

          if (statusText.includes('HTTP ERROR')) takeoverStatus = 'HTTP ERROR';
          else if (statusText.includes('NOT VULNERABLE'))
            takeoverStatus = 'NOT VULNERABLE';
          else if (statusText.includes('VULNERABLE'))
            takeoverStatus = 'VULNERABLE';

          acc[subdomain] = takeoverStatus;
          return acc;
        }, {});

        // Combine results
        const combinedResults = subdomainsWithStatus.map(
          ({ subdomain, statusCode }) => ({
            subdomain,
            statusCode,
            takeoverStatus: subzyResults[subdomain] || 'UNKNOWN',
          }),
        );

        res.status(200).json({ subdomains: combinedResults });
      },
    );
  });
};
