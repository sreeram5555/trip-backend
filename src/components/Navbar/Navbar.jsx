import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Logo" />
        <span>RoamAI</span>
      </Link>
      <div className="navbar-links">
        <a href="#features">Features</a>
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">About</a>
      </div>
      <div className="navbar-actions">
        <Link to="/book-a-trip" className="btn-primary">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;