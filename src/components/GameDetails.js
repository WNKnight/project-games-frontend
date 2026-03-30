import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../utils/GiantBombApi';
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
        setGame({
          ...fetchedGame,
          description: fetchedGame.description || 'No information available for this game.',
        });
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
        <div className="game-details__description">{game.description}</div>
      </div>
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
    </div>
    );
  };

export default GameDetails;
