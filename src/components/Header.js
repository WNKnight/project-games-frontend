import React from 'react';
import Navigation from './Navigation';
import SearchForm from './SearchForm';


function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Game Explorer</h1>
      <Navigation />
      <SearchForm />
    </header>
  );
};

export default Header;