import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGamesBySearchTerm } from '../utils/GameBombApi';
import Preloader from './Preloader';
import searchIcon from '../images/search-icon.png';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        setSearchTerm('');
        setSuggestions([]);
        suggestionsRef.current.classList.add('search__suggestions_hidden');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm.length >= 3) {
        setLoading(true);
        const loadSuggestions = async () => {
          try {
            const results = await fetchGamesBySearchTerm(searchTerm);
            setSuggestions(results.slice(0, 5));
          } catch (error) {
            console.error('Error loading suggestions:', error);
            setSuggestions([]);
          } finally {
            setLoading(false);
          }
        };

        loadSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length < 3) {
      setError('Minimum 3 characters required');
    } else {
      setError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.length >= 3) {
      navigate(`/search-results?query=${searchTerm}`);
      setSearchTerm('');
      setSuggestions([]);
      setError('');
    } else {
      setError('Minimum 3 characters required');
    }
  };

  const handleSuggestionClick = (gameId) => {
    navigate(`/game/${gameId}`);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchTerm}
          onChange={handleChange}
          minLength="3"
          required
          className="search__input"
        />
        <img src={searchIcon} alt="Search" className="search__icon" onClick={handleSubmit} />
      </form>
      {error && <div className="search__error">{error}</div>}
      {searchTerm.length >= 3 && (
        <div className="search__suggestions" ref={suggestionsRef}>
          {loading ? (
            <Preloader />
          ) : (
            suggestions.length > 0 ? (
              suggestions.map((game) => (
                <div
                  key={game.id}
                  className="suggestion"
                  onClick={() => handleSuggestionClick(game.id)}
                >
                  <img className="suggestion__img" src={game.image} alt={game.name} />
                  <span className="suggestion__name">{game.name}</span>
                </div>
              ))
            ) : (
              <div className="search__no-suggestions">Nothing Found</div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SearchForm;