import React from 'react';
import { Link } from 'react-router-dom';
import closeBtn from '../images/cross-close.svg';

function Navigation({ isMobile, toggleMenu }) {
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
    </>
  );
}

export default Navigation;