import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Main from './Main';
import Random from './Random'
import Catalog from './Catalog'
import GameDetails from './GameDetails';
import About from './About'
import Footer from './Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <Navigation />
      <Main>
      <Routes>
        <Route path="/" element={<Random />} />
        <Route path="/catalog/:page" element={<Catalog />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
