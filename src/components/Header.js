import React from 'react';
import Navigation from './Navigation';
import SearchForm from './SearchForm';
import headerLogo from '../images/header-logo.png';


function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <img src={headerLogo} alt="Game Explorer Logo" className="header__logo" />
        <h1 className="header__title">Game Explorer</h1>
      </div>
      <Navigation />
      <div className="header__right">
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;