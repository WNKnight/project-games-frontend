import React, { useState, useEffect } from 'react';
import GameGrid from './GameGrid';
import { fetchRandomGames } from '../utils/GameBombApi';

function Random() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRandomGames = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedGames = await fetchRandomGames();
      setGames(fetchedGames);
    } catch (err) {
      setError(
        'Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomGames();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    loadRandomGames();
  };

  return (
    <div className="random-games">
      <h2 className="random-games__title">Home</h2>
      <h2 className="random-games__subtitle">This Page Has Random Games, if you want to see different games click in the refresh button!</h2>
      <div className="random-games__btn" onClick={handleRefresh}>
        <button>Refresh</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <GameGrid games={games} loading={loading} />
    </div>
  );
};

export default Random;