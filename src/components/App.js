import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Main from './Main';
import Random from './Random'
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
        <Route path="/about" element={<About />} />
      </Routes>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
