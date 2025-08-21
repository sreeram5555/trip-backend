import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-branding">
                        <Link to="/" className="footer-logo">
                            <span>RoamAI</span>
                        </Link>
                        <p className="footer-tagline">Your AI-powered guide to India.</p>
                    </div>
                    <div className="footer-links-group">
                        <div className="footer-links">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/book-a-trip">Start Planning</Link></li>
                                <li><a href="#features">Features</a></li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#privacy">Privacy Policy</a></li>
                                <li><a href="#terms">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} RoamAI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;