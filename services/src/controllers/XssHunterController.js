import puppeteer from 'puppeteer';

const xssPayloads = [
  '<script>alert("XSS1")</script>',
  '<img src=x onerror="alert(\'XSS2\')">',
  '<svg/onload=alert("XSS3")>',
  '<body onload=alert("XSS4")>',
];

export const testXss = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  if (!url.includes('INJECT_HERE')) {
    return res.status(400).send('URL must contain the placeholder INJECT_HERE');
  }

  const results = [];

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (let payload of xssPayloads) {
      const encodedPayload = encodeURIComponent(payload);
      const testUrl = url.replace('INJECT_HERE', encodedPayload);

      console.log(`Testing URL: ${testUrl}`);

      await page.goto(testUrl, { waitUntil: 'domcontentloaded' });

      const pageContent = await page.content();

      if (pageContent.includes(payload)) {
        results.push({
          url: testUrl,
          payload: payload,
          status: 'vulnerable',
        });
      } else {
        results.push({
          url: testUrl,
          payload: payload,
          status: 'not vulnerable',
        });
      }

      await page.close();
    }

    await browser.close();
    console.log(results); // Log the results to the console
    res.status(200).json(results);
  } catch (error) {
    console.error('Error during XSS testing:', error);
    res.status(500).send('Server error');
  }
};
