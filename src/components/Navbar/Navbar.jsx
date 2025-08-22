
import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated,  logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
      await logout();
      navigate('/');
  };

  return (
    <motion.nav 
      className="navbar-container"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <span>RoamAI</span>
        </Link>
        <div className="navbar-links">
          <a href="/#features">Features</a>
        </div>
        <div className="navbar-action">
          {isAuthenticated ? (
            <div className="nav-user-actions">
                <Link to="/profile" className="nav-profile-link">
                {/* Welcome, {user?.name.split(' ')[0]} */}
                Your Trips
                </Link>
                <button onClick={handleLogout} className="cta-button-secondary">Logout</button>
            </div>
          ) : (
            <div className="nav-guest-actions">
                <Link to="/login" className="nav-login-link">Login</Link>
                <Link to="/signup" className="cta-button">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;