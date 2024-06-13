import dns from 'dns';
import net from 'net';

const commonPorts = [
  { port: 21, name: 'FTP' },
  { port: 22, name: 'SSH' },
  { port: 23, name: 'Telnet' },
  { port: 25, name: 'SMTP' },
  { port: 53, name: 'DNS' },
  { port: 80, name: 'HTTP' },
  { port: 110, name: 'POP3' },
  { port: 143, name: 'IMAP' },
  { port: 443, name: 'HTTPS' },
  { port: 8080, name: 'HTTP Proxy' },
  { port: 8000, name: 'custom use' },
];

const scanPort = (ip, port) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);

    socket.on('connect', () => {
      socket.destroy();
      resolve({ port, status: 'open' });
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve({ port, status: 'closed' });
    });

    socket.on('error', () => {
      socket.destroy();
      resolve({ port, status: 'closed' });
    });

    socket.connect(port, ip);
  });
};

export const scanPorts = async (req, res) => {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).send('Domain parameter is required');
  }

  dns.lookup(domain, async (err, address) => {
    if (err) {
      console.error('DNS lookup error:', err);
      return res.status(500).send('Error resolving domain');
    }

    const scanResults = await Promise.all(
      commonPorts.map(async ({ port, name }) => {
        const result = await scanPort(address, port);
        return { ...result, name };
      }),
    );

    res.status(200).json({ domain, ip: address, results: scanResults });
  });
};
