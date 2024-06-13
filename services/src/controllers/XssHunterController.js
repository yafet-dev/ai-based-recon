import axios from 'axios';

const xssPayloads = [
  '<script>alert("XSS1")</script>',
  '<img src=x onerror="alert(\'XSS2\')">',
  '<svg/onload=alert("XSS3")>',
  '<body onload=alert("XSS4")>',
];

export const testXss = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    console.log('URL is required');
    return res.status(400).send('URL is required');
  }

  if (!url.includes('INJECT_HERE')) {
    console.log('URL must contain the placeholder INJECT_HERE');
    return res.status(400).send('URL must contain the placeholder INJECT_HERE');
  }

  const results = [];

  try {
    for (let payload of xssPayloads) {
      const testUrl = url.replace('INJECT_HERE', encodeURIComponent(payload));

      console.log(`Testing URL: ${testUrl}`);

      try {
        const response = await axios.get(testUrl);

        const pageContent = response.data;
        console.log(
          `Page content length for ${testUrl}: ${pageContent.length}`,
        );

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
      } catch (error) {
        console.error(`Error navigating to URL: ${testUrl}`, error);
        results.push({
          url: testUrl,
          payload: payload,
          status: 'error',
        });
      }
    }

    console.log(results); // Log the results to the console
    res.status(200).json(results);
  } catch (error) {
    console.error('Error during XSS testing:', error);
    res.status(500).send('Server error');
  }
};
