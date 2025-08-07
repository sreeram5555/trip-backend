import React from 'react';
import './HowItWorks.css';
import { motion } from 'framer-motion';

const steps = [
    {
        step: "01",
        title: "Share Your Vision",
        description: "Tell us about your ideal trip—your budget, interests, who you're traveling with, and for how long. The more details, the better!"
    },
    {
        step: "02",
        title: "AI-Powered Discovery",
        description: "Our agents analyze your inputs to suggest three personalized destinations, explaining why each is a perfect match for you."
    },
    {
        step: "03",
        title: "Customize & Refine",
        description: "From the suggested city, pick the attractions and local cuisines that excite you the most to craft your unique adventure."
    },
    {
        step: "04",
        title: "Receive Your Plan",
        description: "Get a complete, day-by-day itinerary, including travel, accommodations, and activities, all organized into a seamless schedule."
    }
];

const cardVariants = {
    offscreen: { opacity: 0, x: -100 },
    onscreen: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: i * 0.2
        }
    })
};

const HowItWorks = () => {
    return (
        <section className="how-it-works-section">
            <div className="section-container">
                <div className="section-header">
                    <h2>Your Journey, Simplified</h2>
                    <p>Four simple steps from dream to destination.</p>
                </div>
                <div className="steps-grid">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="step-card"
                            custom={index}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={cardVariants}
                        >
                            <div className="step-number">{step.step}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;