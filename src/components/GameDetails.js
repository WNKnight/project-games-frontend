import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGameDetails } from '../utils/GameBombApi';
import DOMPurify from 'dompurify';
import Preloader from './Preloader';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGameDetails = async () => {
      setLoading(true);
      try {
        const fetchedGame = await fetchGameDetails(id);
        const description = fetchedGame.description || fetchedGame.deck || 'No information available for this game.';
        const cleanDescription = DOMPurify.sanitize(description, {
          FORBID_TAGS: ['a'],
        });
        setGame({ ...fetchedGame, description: cleanDescription });
        setError(null);
      } catch (err) {
        setError(
          'Sorry, something went wrong during the request. There may be a connection problem or the server may be down. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadGameDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <Preloader />;
  }

  if (error || !game) {
    return <div className="game-details__error-message">Nothing Found</div>;
  }

  const formattedReleaseDate = game.releaseDate
    ? new Date(game.releaseDate).toLocaleDateString()
    : 'Release date not available';

  return (
    <div className="game-details">
      <h2 className="game-details__title">{game.name}</h2>
      <div className="game-details__image-block">
        <img src={game.image} alt={game.name} className="game-details__image" />
      </div>
      <div className="game-details__block">
        <strong>Description:</strong>
        <div className="game-details__description" dangerouslySetInnerHTML={{ __html: game.description }} />
      </div>
      {game.franchises && game.franchises.length > 0 && (
        <div className="game-details__franchises">
          <h3>Franchises: </h3>
          <ul className="game-details__franchises-list">
            {game.franchises.map((franchise) => (
              <li className="game-details__franchise-item" key={franchise.id}>
                <Link to={`/franchise/${franchise.id}`} className="game-details__link">
                  {franchise.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {game.characters && game.characters.length > 0 && (
        <div className="game-details__characters">
          <h3>Characters: </h3>
          <ul className="game-details__characters-list">
            {game.characters.map((character) => (
              <li className="game-details__character-item" key={character.id}>
                <Link to={`/character/${character.id}`} className="game-details__link">
                  {character.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="game-details__info">
        <strong>Developers: </strong> {game.developers.length ? game.developers.join(', ') : 'No information available'}
      </p>
      <p className="game-details__info">
        <strong>Genres: </strong> {game.genres.length ? game.genres.join(', ') : 'No information available'}
    </p>
    <p className="game-details__info">
      <strong>Platforms: </strong> {game.platforms.length ? game.platforms.join(', ') : 'No information available'}
    </p>
    <p className="game-details__info">
      <strong>Publishers: </strong> {game.publishers.length ? game.publishers.join(', ') : 'No information available'}
    </p>
    <p className="game-details__info">
      <strong>Release Date: </strong> {formattedReleaseDate}
    </p>
    {game.similarGames && game.similarGames.length > 0 && (
      <div className="game-details__similar-games">
        <h3 className="game-details__similar-games-title">Similar Games: </h3>
        <ul className="game-details__similar-games-block">
          {game.similarGames.map((similarGame) => (
            <li className="game-details__similar-games-list" key={similarGame.id}>
              <Link to={`/game/${similarGame.id}`} className="game-details__similar-link">
                {similarGame.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
    </div>
    );
  };

export default GameDetails;
