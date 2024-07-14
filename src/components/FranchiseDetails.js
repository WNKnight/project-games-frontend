import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFranchiseDetails } from '../utils/GameBombApi';
import Preloader from './Preloader';
import DOMPurify from 'dompurify';

function sanitizeAndEnhanceDescription(html) {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    FORBID_TAGS: ['a'],
  });
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = sanitizedHtml;

  return tempDiv.innerHTML;
};

const FranchiseDetails = () => {
  const { id } = useParams();
  const [franchise, setFranchise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFranchiseDetails = async () => {
      try {
        const fetchedFranchise = await fetchFranchiseDetails(id);
        const description = fetchedFranchise.description || fetchedFranchise.resume || 'No information available for this franchise.';
        fetchedFranchise.description = sanitizeAndEnhanceDescription(description);
        setFranchise(fetchedFranchise);
        setError(null);
      } catch (err) {
        setError('Sorry, something went wrong during the request. There may be a connection problem or the server may be down. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    loadFranchiseDetails();
    window.scrollTo(0, 0);
  }, [id]);
  
  if (loading) {
    return <Preloader />;
  }
  
  if (error || !franchise || !franchise.name) {
    return <div className="franchise-details__error-message">Nothing Found</div>;
  } 
  

  return (
    <div className="franchise-details">
      <h2 className="franchise-details__title">{franchise.name}</h2>
      <div className="franchise-details__description">
        <strong>Description:</strong>
        <div dangerouslySetInnerHTML={{ __html: franchise.description }} />
      </div>
      <div className="franchise-details__games">
        <h3 className="franchise-details__games-title">Games:</h3>
        {franchise.games && franchise.games.length > 0 ? (
          <ul className="franchise-details__games-block">
            {franchise.games.map((game) => (
              <li className="franchise-details__games-list" key={game.id} >
                <Link to={`/game/${game.id}`} className="franchise-details__games-link">{game.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="franchise-details__no-info">No information available for this franchise.</p>
        )}
      </div>
    </div>
  );
};

export default FranchiseDetails;
