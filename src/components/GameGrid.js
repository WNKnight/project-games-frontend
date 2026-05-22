import React from 'react';
import GameCard from './GameCard';
import Preloader from './Preloader';

function GameGrid({ games, loading }) {
  return (
    <div className="game-grid">
      <div className="game-grid__content">
        {loading && games.length === 0
          ? Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="game-card skeleton-card"></div>
            ))
          : games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))
        }

      </div>
      {loading && games.length > 0 && (
        <div className="game-grid__loader">
          <Preloader />
        </div>
      )}
    </div>
  );
}

export default GameGrid;