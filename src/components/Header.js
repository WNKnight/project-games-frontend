import React, { useState } from 'react';
import Navigation from './Navigation';
import SearchForm from './SearchForm';
import headerLogo from '../images/header-logo.png';
import navIcon from '../images/menu-icon.svg';

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <header className="header">
      <div className="header__left">
        <span className="navigation__open-btn" onClick={toggleMenu}>
          <img src={navIcon} className="navigation__icon" alt="Menu" />
        </span>

        <img src={headerLogo} alt="Game Explorer Logo" className="header__logo" />
        <h1 className="header__title">Game Explorer</h1>
      </div>

      <Navigation isMobile={isMobile} toggleMenu={toggleMenu} />

      <div className="header__right">
        <SearchForm />
      </div>
    </header>
  );
}

export default Header;