import React from 'react';
import GameCard from './GameCard';
import Preloader from './Preloader'

function GameGrid ({ games, loading }) {
  return (
    <div className="game-grid">
      {loading ? (
        <Preloader />
      ) : (
        <div className="game-grid__content">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameGrid;
