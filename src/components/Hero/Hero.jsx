import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (window.VANTA && !vantaEffect) {
      const effect = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x2dd4bf,
        backgroundColor: 0x020617,
        points: 6.00,      // The fine-tuned, subtle value
        maxDistance: 16.00, // The fine-tuned, subtle value
        spacing: 20.00
      });
      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="hero-section">
      <div className="hero-content">
        <motion.h1 
          className="hero-headline"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Your Personal AI <br />
          <span className="gradient-text">Travel Architect</span>
        </motion.h1>
        <motion.p 
          className="hero-subheadline"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Discover India like never before. RoamAI crafts bespoke itineraries, 
          uncovering hidden gems and creating unforgettable journeys tailored just for you.
        </motion.p>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
            <Link to="/book-a-trip" className="hero-cta-button">
              Start Your Journey
            </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;