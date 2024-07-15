import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacterDetails } from '../utils/GiantBombApi';
import Preloader from './Preloader';
import DOMPurify from 'dompurify';

function CharacterDetails(){
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacterDetails = async () => {
      try {
        const fetchedCharacter = await fetchCharacterDetails(id);
        const description = fetchedCharacter.description || fetchedCharacter.resume || 'No information available for this character.';
        const cleanDescription = DOMPurify.sanitize(description, {
          FORBID_TAGS: ['a'],
        });
        setCharacter({ ...fetchedCharacter, description: cleanDescription });
        setError(null);
      } catch (err) {
        setError('Sorry, something went wrong during the request. There may be a connection problem or the server may be down. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCharacterDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <Preloader />;
  }

  if (error || !character.name) {
    return <div className="character-details__error-message">Nothing Found</div>;
  }

  return (
    <div className="character-details">
      <h2 className="character-details__title">{character.name}</h2>
      {character.image && (
        <div className="character-details__image-block">
          <img className="character-details__image" src={character.image} alt={character.name} />
        </div>
      )}
      <div className="character-details__block">
        <strong>Description:</strong>
        {character.description ? (
          <div className="character-details__description" dangerouslySetInnerHTML={{ __html: character.description }} />
        ) : (
          <p className="no-description">No information available for this character.</p>
        )}
      </div>
      {character.franchises && character.franchises.length > 0 && (
        <div className="character-details__franchises">
          <h3>Franchises: </h3>
          <ul className="character-franchises__block">
            {character.franchises.map((franchise) => (
              <li className="character-franchises__franchises-list" key={franchise.id}>
                <Link to={`/franchise/${franchise.id}`} className="character-details__franchise-link">
                  {franchise.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {character.games && character.games.length > 0 && (
        <div className="character-details__games">
          <h3>Games: </h3>
          <ul className="character-details__games-block">
            {character.games.map((game) => (
              <li className="character-details__games-list" key={game.id}>
                <Link to={`/game/${game.id}`} className="character-details__games-link">
                  {game.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;