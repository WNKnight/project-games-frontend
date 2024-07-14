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

export async function fetchCatalogGames(itemsPerPage, offset, sortBy) {
  const sortOrder = sortBy === 'asc' ? 'name:asc' : 'name:desc';
  return fetchGames({ limit: itemsPerPage, offset, sortOrder });
}

export async function fetchTotalGamesCount() {
  const endpoint = `/api/games/?api_key=${API_KEY}&format=json`;
  const data = await makeRequest(endpoint);

  if (!data.number_of_total_results) {
    throw new Error('No total results count found in the response');
  }

  return data.number_of_total_results;
}

export async function fetchGamesBySearchTerm(searchTerm) {
  const endpoint = `/api/games/?api_key=${API_KEY}&format=json&filter=name:${searchTerm}`;
  const data = await makeRequest(endpoint);

  if (!data.results) {
    throw new Error('No results found in the response');
  }

  return data.results.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.image.original_url,
  }));
}

export async function fetchGameDetails(id) {
  const endpoint = `/api/game/${id}/?api_key=${API_KEY}&format=json`;
  const data = await makeRequest(endpoint);

  if (!data.results) {
    throw new Error('No results found in the response');
  }

  const { results } = data;
  return {
    id: results.id,
    name: results.name,
    image: results.image.super_url,
    description: results.description,
    characters: results.characters?.map((char) => ({ id: char.id, name: char.name })) || [],
    developers: results.developers?.map((dev) => dev.name) || [],
    franchises: results.franchises?.map((franchise) => ({ id: franchise.id, name: franchise.name })) || [],
    platforms: results.platforms?.map((platform) => platform.name) || [],
    publishers: results.publishers?.map((publisher) => publisher.name) || [],
    genres: results.genres?.map((genre) => genre.name) || [],
    releaseDate: results.original_release_date,
    similarGames: results.similar_games?.map((game) => ({ id: game.id, name: game.name })) || [],
  };
}