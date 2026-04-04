import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import navIcon from '../images/menu-icon.svg';
import closeBtn from '../images/cross-close.svg';

function Navigation() {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`navigation ${isMobile ? 'navigation--hidden' : ''}`}>
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/" className="navigation__link">Home</Link>
          </li>
          <li className="navigation__item">
            <Link to="/catalog" className="navigation__link">Catalog</Link>
          </li>
          <li className="navigation__item">
            <Link to="/about" className="navigation__link">About</Link>
          </li>
        </ul>
      </nav>

      <div className={`navigation__sidenav ${isMobile ? 'navigation__sidenav--active' : ''}`}>
        <span className="navigation__close-container" onClick={toggleMenu}>
          <img className="navigation__close-btn" src={closeBtn} alt="Close Menu" />
        </span>

        <ul className="navigation__sidenav-list">
          <li className="navigation__sidenav-item">
            <Link to="/" className="navigation__sidenav-link" onClick={toggleMenu}>Home</Link>
          </li>
          <li className="navigation__sidenav-item">
            <Link to="/catalog" className="navigation__sidenav-link" onClick={toggleMenu}>Catalog</Link>
          </li>
          <li className="navigation__sidenav-item">
            <Link to="/about" className="navigation__sidenav-link" onClick={toggleMenu}>About</Link>
          </li>
        </ul>
      </div>

      <span
        className={`navigation__open-btn ${isMobile ? 'navigation__open-btn--hidden' : ''}`}
        onClick={toggleMenu}
      >
        <img className="navigation__icon" src={navIcon} alt="Open Menu" />
      </span>
    </>
  );
};

export default Navigation;