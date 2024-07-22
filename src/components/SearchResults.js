import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameGrid from './GameGrid';
import { fetchGamesBySearchTerm } from '../utils/GiantBombApi';
import Preloader from './Preloader';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedGames = await fetchGamesBySearchTerm(query);
        setGames(fetchedGames);
      } catch (err) {
        setError(
          'Sorry, something went wrong during the request. There may be a connection problem or the server may be down. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      loadGames();
    }
  }, [query]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <GameGrid games={games} />
      )}
    </div>
  );
};

export default SearchResults;