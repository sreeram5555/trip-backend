import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Itinerary.css';
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';

const Itinerary = () => {
    const location = useLocation();
    const { itineraryData, place } = location.state || { itineraryData: null, place: "your destination" };

    if (!itineraryData || !itineraryData.itinerary) {
        return (
            <>
                <Navbar />
                <div className="page-container">
                    <h2 className="error-title">Itinerary Not Found</h2>
                    <p>Something went wrong. Please start over.</p>
                    <Link to="/" className="home-button">Go to Homepage</Link>
                </div>
            </>
        );
    }
    
    // Helper to render different step types
    const renderStep = (step, index) => {
        switch(step.type) {
            case 'spot':
                return <div key={index} className="timeline-item spot"><strong>Visit:</strong> {step.name} ({step.visit_time})</div>;
            case 'cuisine':
                return <div key={index} className="timeline-item cuisine"><strong>Taste:</strong> {step.dish}</div>;
            case 'restaurant':
                return <div key={index} className="timeline-item restaurant"><strong>Dine at:</strong> {step.options[0].name}</div>;
            case 'accommodation':
                 return <div key={index} className="timeline-item accommodation"><strong>Check-in:</strong> {step.options[0].name}</div>;
            case 'travel':
                return <div key={index} className="timeline-item travel"><strong>Travel:</strong> From {step.from} to {step.to} ({step.options[0].mode})</div>;
            case 'break':
                 return <div key={index} className="timeline-item break"><strong>Break:</strong> {step.activity} ({step.duration})</div>;
            default:
                return null;
        }
    };


    return (
        <>
            <Navbar />
            <div className="page-container itinerary-container">
                <motion.div
                    className="itinerary-wrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="itinerary-title">Your Personalized Itinerary for {place}</h1>
                    <p className="itinerary-subtitle">Here is your day-by-day plan for an amazing trip!</p>

                    <div className="days-section">
                        {itineraryData.itinerary.map((day, dayIndex) => (
                            <motion.div
                                key={day.day}
                                className="day-card"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: dayIndex * 0.2 }}
                            >
                                <h2 className="day-title">Day {day.day}</h2>
                                <div className="timeline">
                                    {day.steps.map((step, stepIndex) => (
                                        renderStep(step, stepIndex)
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Itinerary;