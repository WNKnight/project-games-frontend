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
  if (!name) return 'Unknown Game';

  const cleaned = name.replace(/[^\p{L}\p{N}\s]/gu, '').trim();

  return cleaned.length > 0 ? cleaned : 'Unknown Game';
}

export async function fetchGames({ limit = 12, page = 1, sortBy }) {
  const pagesToFetch = 3;

  let allResults = [];

  for (let i = 1; i <= pagesToFetch; i++) {
    const endpoint = `${BASE_URL}/games?key=${API_KEY}&page=${i}&page_size=40`;
    const data = await makeRequest(endpoint);
    allResults.push(...data.results);
  }

  return allResults
    .map((game) => ({
      id: game.id,
      name: cleanName(game.name),
      image: game.background_image || '',
    }))
    .sort((a, b) =>
      sortBy === 'asc'
        ? a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
        : b.name.localeCompare(a.name, 'en', { sensitivity: 'base' })
    )
    .slice((page - 1) * limit, page * limit);
}

let usedGameIds = new Set();

export async function fetchRandomGames(limit = 12) {
  const pagesToFetch = 5;

  let allResults = [];

  for (let i = 1; i <= pagesToFetch; i++) {
    const randomPage = Math.floor(Math.random() * 10) + 1;

    const endpoint = `${BASE_URL}/games?key=${API_KEY}&page=${randomPage}&page_size=40`;
    const data = await makeRequest(endpoint);

    allResults.push(...data.results);
  }

  const uniqueGames = Array.from(
    new Map(allResults.map((g) => [g.id, g])).values()
  );

  const freshGames = uniqueGames.filter((g) => !usedGameIds.has(g.id));

  for (let i = freshGames.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [freshGames[i], freshGames[j]] = [freshGames[j], freshGames[i]];
  }

  const selected = freshGames.slice(0, limit);

  selected.forEach((g) => usedGameIds.add(g.id));

  if (usedGameIds.size > 500) {
    usedGameIds.clear();
  }

  return selected.map((game) => ({
    id: game.id,
    name: cleanName(game.name),
    image: game.background_image || '',
  }));
}

export async function fetchCatalogGames(itemsPerPage, page, sortBy) {
  return fetchGames({
    limit: itemsPerPage,
    page,
    sortBy
  });
}

export async function fetchTotalGamesCount() {
  const endpoint = `${BASE_URL}/games?key=${API_KEY}&page_size=1`;
  const data = await makeRequest(endpoint);

  if (!data.count) {
    throw new Error('No total count found in the response');
  }

  return data.count;
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