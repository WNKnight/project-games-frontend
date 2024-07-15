import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Main from './Main';
import Random from './Random';
import Catalog from './Catalog';
import SearchResults from './SearchResults';
import GameDetails from './GameDetails';
import FranchiseDetails from './FranchiseDetails';
import CharacterDetails from './CharacterDetails';
import About from './About';
import NotFound from './NotFound';
import Footer from './Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <Navigation />
      <Main>
        <Routes>
          <Route path="/" element={<Random />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:page" element={<Catalog />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/franchise/:id" element={<FranchiseDetails />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Main>
      <Footer />
    </div>
  );
}

export default App;