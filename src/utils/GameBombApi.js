const API_KEY = '9a9a64e0b46465097acdb253596d3973546b7f57';

async function makeRequest(endpoint) {
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });
}
