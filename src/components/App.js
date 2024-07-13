import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import About from './About'
import Footer from './Footer';

function App() {
  return (
    <div className="page">
        <Header />
        <Main>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </Main>
        <Footer />
    </div>
  );
}

export default App;
