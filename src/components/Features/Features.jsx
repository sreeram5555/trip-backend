import React from 'react';
import './Features.css';
import { motion } from 'framer-motion';

// Mock data for features
const featuresData = [
    {
        icon: '🤖',
        title: 'AI-Powered Suggestions',
        description: 'Our intelligent agent analyzes your preferences to suggest destinations perfectly tailored to your travel style.'
    },
    {
        icon: '🗺️',
        title: 'Personalized Itineraries',
        description: 'Go beyond just booking. Get a detailed, day-by-day plan with attractions, cuisine, and travel, all organized for you.'
    },
    {
        icon: '💎',
        title: 'Discover Hidden Gems',
        description: 'Our local expert agent uncovers unique spots and authentic experiences that you won\'t find in a typical guidebook.'
    },
    {
        icon: '✅',
        title: 'Seamless Planning',
        description: 'From initial ideas to a final, structured plan, our multi-agent system handles the complexity so you can focus on the excitement.'
    }
];

// Animation variants for Framer Motion
const cardVariants = {
    offscreen: {
        y: 100,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const Features = () => {
    return (
        <section id="features" className="features-section">
            <div className="features-container">
                <div className="features-header">
                    <h2>Why Plan With RoamAI?</h2>
                    <p>A smarter, more personal way to explore the wonders of India.</p>
                </div>
                <div className="features-grid">
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={cardVariants}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;