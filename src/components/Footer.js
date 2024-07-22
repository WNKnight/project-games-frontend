import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
      <footer className="footer">
        <h2 className="footer__copyright">&copy; 2024 Game Info</h2>
        <Link to="/about" className="footer__link">About</Link>
      </footer>
    );
  }
  
  export default Footer;