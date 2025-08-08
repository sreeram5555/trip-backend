import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import "./HeroParallax.css";

// Define the product screenshots and their data
const products = [
    // Column 1
    { title: "Personalized Discovery", link: "#", thumbnail: "/product-screens/screen-preferences.png" },
    { title: "Smart Itineraries", link: "#", thumbnail: "/product-screens/screen-itinerary.png" },
    { title: "Authentic Culinary Paths", link: "#", thumbnail: "/product-screens/screen-city-selection.png" },
    
    // Column 2
    { title: "AI-Powered Suggestions", link: "#", thumbnail: "/product-screens/screen-city-selection.png" },
    { title: "Discover Hidden Gems", link: "#", thumbnail: "/product-screens/screen-itinerary.png" },
    { title: "For Every Traveler", link: "#", thumbnail: "/product-screens/screen-preferences.png" },

    // Column 3
    { title: "Seamless Planning", link: "#", thumbnail: "/product-screens/screen-itinerary.png" },
    { title: "Hyper-Personalization", link: "#", thumbnail: "/product-screens/screen-preferences.png" },
    { title: "Built with Passion", link: "#", thumbnail: "/product-screens/screen-city-selection.png" },
];

const ProductCard = ({ product }) => {
    return (
        <motion.div className="product-card" whileHover={{ y: -20 }}>
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <div className="product-overlay" />
            <h3 className="product-title">{product.title}</h3>
        </motion.div>
    );
};

const HeroParallax = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // For the main title section
    const pathLength = useTransform(scrollYProgress, [0, 0.8], [0.8, 1.2]);

    // For the parallax columns
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return (
        <div ref={targetRef} className="hero-parallax-container">
            <div className="hero-header">
                <motion.h1 className="hero-title" style={{ scale: pathLength, opacity: pathLength }}>
                    Your Personal AI <br /> <span className="highlight">Travel Architect</span>
                </motion.h1>
                <p className="hero-subtitle">
                    Discover India like never before. RoamAI crafts bespoke itineraries,
                    uncovering hidden gems and creating unforgettable journeys.
                </p>
                <Link to="/book-a-trip" className="hero-cta">
                    Start Your Journey
                </Link>
            </div>

            <div className="parallax-content">
                <motion.div className="parallax-column" style={{ y: y1 }}>
                    {products.slice(0, 3).map((p, i) => <ProductCard product={p} key={`c1-${i}`} />)}
                </motion.div>
                <motion.div className="parallax-column" style={{ y: y2 }}>
                    {products.slice(3, 6).map((p, i) => <ProductCard product={p} key={`c2-${i}`} />)}
                </motion.div>
                <motion.div className="parallax-column" style={{ y: y3 }}>
                    {products.slice(6, 9).map((p, i) => <ProductCard product={p} key={`c3-${i}`} />)}
                </motion.div>
            </div>
        </div>
    );
};

export default HeroParallax;