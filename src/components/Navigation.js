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
      <nav className={`navbar ${isMobile ? 'hidden' : ''}`}>
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">Home</Link>
          </li>
          <li className="navbar__item">
            <Link to="/catalog" className="navbar__link">Catalog</Link>
          </li>
          <li className="navbar__item">
            <Link to="/about" className="navbar__link">About</Link>
          </li>
        </ul>
      </nav>

      <div className={`sidenav ${isMobile ? 'active' : ''}`}>
        <span className="closebtn-container" onClick={toggleMenu}>
          <img className="closebtn" src={closeBtn} alt="Close Menu" />
        </span>
        <ul className="sidenav__list">
          <li className="sidenav__item">
            <Link to="/" className="sidenav__link" onClick={toggleMenu}>Home</Link>
          </li>
          <li className="sidenav__item">
            <Link to="/catalog" className="sidenav__link" onClick={toggleMenu}>Catalog</Link>
          </li>
          <li className="sidenav__item">
            <Link to="/about" className="sidenav__link" onClick={toggleMenu}>About</Link>
          </li>
        </ul>
      </div>

      <span className={`openbtn ${isMobile ? 'hidden' : ''}`} onClick={toggleMenu}>
        <img className="navIcon" src={navIcon} alt="Open Menu" />
      </span>
    </>
  );
};

export default Navigation;
