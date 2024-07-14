import React from 'react';
import SearchForm from './SearchForm';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Game Explorer</h1>
      <SearchForm />
    </header>
  );
};

export default Header;