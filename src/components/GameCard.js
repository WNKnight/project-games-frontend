import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game }){

  return (
    <Link to={`/game/${game.id}`} className="game-card__link">
      <div className="game-card">
        <img src={game.image} alt={game.name} className="game-card__image" />
        <div className="game-card__block-info">
          <h3 className="game-card__title">{game.name}</h3>
          <p className="game-card__description">{game.deck}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
