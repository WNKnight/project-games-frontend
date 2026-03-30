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
  const offset = Math.floor(Math.random() * 10000);
  return fetchGames({ limit, offset, sortOrder: null });
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
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const endpoint = `/api/games/?api_key=${API_KEY}&format=json&filter=name:${normalizedSearchTerm}`;

  try {
    const data = await makeRequest(endpoint);
    if (!data.results) {
      throw new Error('No results found in the response');
    }

    return data.results.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.image.original_url,
    }));
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
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

export async function fetchFranchiseDetails(id) {
  const endpoint = `/api/franchise/${id}/?api_key=${API_KEY}&format=json`;
  const data = await makeRequest(endpoint);

  if (!data.results) {
    throw new Error('No results found in the response');
  }

  return {
    id: data.results.id,
    name: data.results.name,
    description: data.results.description,
    resume: data.results.deck,
    games: data.results.games?.map((game) => ({ id: game.id, name: game.name })) || [],
  };
}

export async function fetchCharacterDetails(id) {
  const endpoint = `/api/character/${id}/?api_key=${API_KEY}&format=json`;
  const data = await makeRequest(endpoint);

  if (!data.results) {
    throw new Error('No results found in the response');
  }

  return {
    id: data.results.id,
    name: data.results.name,
    resume: data.results.deck,
    description: data.results.description,
    games: data.results.games?.map((game) => ({ id: game.id, name: game.name })) || [],
    franchises: data.results.franchises?.map((franchise) => ({ id: franchise.id, name: franchise.name })) || [],
    image: data.results.image?.medium_url || '',
  };
}