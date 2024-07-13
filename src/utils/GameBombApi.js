const API_KEY = '9a9a64e0b46465097acdb253596d3973546b7f57';

async function makeRequest(endpoint) {
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch data from ${endpoint}: ${errorText}`);
  }

  return response.json();
}

async function fetchGames({ limit, offset, sortOrder }) {
  const endpoint = `/api/games/?api_key=${API_KEY}&format=json&limit=${limit}&offset=${offset}${sortOrder ? `&sort=${sortOrder}` : ''}`;
  const data = await makeRequest(endpoint);

  if (!data.results) {
    throw new Error('No results found in the response');
  }

  return data.results.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.image.thumb_url,
    deck: game.deck
  }));
}

export async function fetchRandomGames(limit = 12) {
  const offset = Math.floor(Math.random() * 10000);
  return fetchGames({ limit, offset, sortOrder: null });
}