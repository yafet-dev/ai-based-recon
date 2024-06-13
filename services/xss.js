import axios from 'axios';

// Define common XSS payloads
const xssPayloads = [
  "<script>alert('XSS')</script>",
  "\"'><script>alert('XSS')</script>",
  "<img src=x onerror=alert('XSS')>",
];

// Function to check for XSS vulnerability
async function checkXss(url) {
  for (const payload of xssPayloads) {
    const testUrl = `${url}${encodeURIComponent(payload)}`;
    try {
      const response = await axios.get(testUrl);
      if (response.data.includes(payload)) {
        return `Vulnerable to XSS with payload: ${payload}`;
      }
    } catch (error) {
      console.error('Error fetching the webpage:', error);
    }
  }
  return 'No XSS vulnerability found';
}

// Main function
(async () => {
  const url = process.argv[2];
  if (!url) {
    console.log('Please provide a URL as an argument.');
    process.exit(1);
  }
  const result = await checkXss(url);
  console.log(result);
})();
