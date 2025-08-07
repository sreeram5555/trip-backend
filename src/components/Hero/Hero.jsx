import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="hero-section">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="hero-headline">
          Craft Your Unforgettable <br /> Indian Journey
        </h1>
        <p className="hero-subheadline">
          Your personal AI travel agent for discovering the soul of India. From hidden gems to iconic landmarks, all tailored to you.
        </p>
        <Link to="/book-a-trip" className="hero-cta">
          ✨ Plan My Trip
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;