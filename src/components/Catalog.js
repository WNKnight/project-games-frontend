import React, { useState, useEffect } from 'react';
import { fetchGamesPage } from '../utils/RawgApi';
import Preloader from './Preloader';
import GameGrid from './GameGrid';

function Catalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialGames = async () => {
      try {
        setLoading(true);

        const data = await fetchGamesPage(1);

        setGames(data.games);
        setError(null);
      } catch (err) {
        setError('Error when loading games. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialGames();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='catalog'>
      <h2 className="catalog__title">Game Catalog</h2>
      <GameGrid games={games} />
    </div>
  );
}

export default Catalog;