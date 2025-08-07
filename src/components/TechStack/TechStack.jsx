import React from 'react';
import './TechStack.css';
import { motion } from 'framer-motion';

const techItems = [
    { name: "React.js", description: "For a dynamic and responsive user interface." },
    { name: "CrewAI", description: "Orchestrates our team of AI agents to perform complex planning tasks." },
    { name: "Google Gemini", description: "The powerful language model that fuels our agents' intelligence and creativity." }
];

const TechStack = () => {
    return (
        <section className="tech-stack-section">
            <div className="section-container">
                <div className="section-header">
                    <h2>The Technology Behind Your Trip</h2>
                    <p>Powered by a cutting-edge, multi-agent AI system.</p>
                </div>
                <div className="tech-cards-container">
                    {techItems.map((item, index) => (
                         <motion.div
                            key={index}
                            className="tech-card"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <h3 className="tech-name">{item.name}</h3>
                            <p className="tech-description">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TechStack;