import React from 'react';
import GameCard from './GameCard';
import Preloader from './Preloader'

function GameGrid({ games, loading }) {
  return (
    <div className="game-grid">
      <div className="game-grid__content">
        {games.map((game, index) => (
          <GameCard key={`${game.id}-${index}`} game={game} />
        ))}
      </div>
      {loading && <Preloader />}
    </div>
  );
}

export default GameGrid;
