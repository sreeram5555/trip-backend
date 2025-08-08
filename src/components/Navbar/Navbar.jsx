import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar-container"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
          <span>RoamAI</span>
        </Link>
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#tech-stack">Technology</a>
        </div>
        <div className="navbar-action">
          <Link to="/book-a-trip" className="cta-button">
            Plan a Trip
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;