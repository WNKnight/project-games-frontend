const API_KEY = '1f4b7eece0bf4cea8a54533bc589ea99';
const BASE_URL = 'https://api.rawg.io/api';

async function makeRequest(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch data from ${endpoint}: ${errorText}`);
  }

  return response.json();
}

function cleanName(name) { 
  return name?.replace(/[^a-zA-Z0-9\s]/g, '').trim() || '';
}

async function fetchGames({ limit = 12, page = 1, ordering }) {
  let endpoint = `${BASE_URL}/games?key=${API_KEY}&page_size=${limit}&page=${page}`;

  if (ordering) {
    endpoint += `&ordering=${ordering}`;
  }

  const data = await makeRequest(endpoint);

  if (!data.results) {
    throw new Error('No results found in the response');
  }

  return data.results.map((game) => ({
    id: game.id,
    name: cleanName(game.name),
    image: game.background_image || '',
  }));
}


export async function fetchRandomGames(limit = 12) {
  const page = Math.floor(Math.random() * 50) + 1;
  return fetchGames({
    limit,
    page,
  });
  
}

export async function fetchCatalogGames(itemsPerPage, page, sortBy) {
  const ordering = sortBy === 'asc' ? 'name' : '-name';

  return fetchGames({
    limit: itemsPerPage,
    page,
    ordering,
  });
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
  const normalizedSearchTerm = searchTerm.trim();
  const endpoint = `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(normalizedSearchTerm)}`;

  try {
    const data = await makeRequest(endpoint);

    if (!data.results) {
      throw new Error('No results found in the response');
    }

    return data.results.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image || '',
    }));
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}

export async function fetchGameDetails(id) {
  const endpoint = `${BASE_URL}/games/${id}?key=${API_KEY}`;
  const data = await makeRequest(endpoint);

  if (!data) {
    throw new Error('No data found in the response');
  }

  return {
    id: data.id,
    name: data.name,
    image: data.background_image || '',
    description: data.description_raw || '',
    developers: data.developers?.map((dev) => dev.name) || [],
    platforms: data.platforms?.map((p) => p.platform.name) || [],
    publishers: data.publishers?.map((pub) => pub.name) || [],
    genres: data.genres?.map((genre) => genre.name) || [],
    releaseDate: data.released || '',
  };
}