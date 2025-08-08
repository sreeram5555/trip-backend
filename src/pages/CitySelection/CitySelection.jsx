import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getLocalInfo } from '../../services/api';
import './CitySelection.css';
import Navbar from '../../components/Navbar/Navbar';
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import MultiStepLoader from '../../components/MultiStepLoader/MultiStepLoader';
import { motion, AnimatePresence } from 'framer-motion';

const CitySelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { suggestions, userPreferences } = location.state || { suggestions: [], userPreferences: null };

    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [error, setError] = useState('');

    const handleCitySelect = async (place) => {
        setIsLoadingPage(true);
        setError('');
        try {
            const response = await getLocalInfo(userPreferences, place);
            if (response.data && response.data.formatted) {
                navigate('/select-spots', { 
                    state: { 
                        cityDetails: response.data.formatted,
                        selectedPlace: place, 
                        userPreferences 
                    } 
                });
            } else {
                 setError('Could not fetch details for this city. Please try another.');
                 setIsLoadingPage(false);
            }
        } catch (err) {
            setError('An error occurred while fetching city details. Please try again.');
            console.error('Error fetching city details:', err);
            setIsLoadingPage(false);
        }
    };

    if (!suggestions || suggestions.length === 0) {
        return (
             <>
                <Navbar />
                <div className="page-container selection-page-container">
                    <GlowingStarsBackground />
                    <div className="content-wrapper">
                        <h2 className="selection-title">No Suggestions Found</h2>
                        <p className="selection-subtitle">Please go back and try different preferences.</p>
                        <Link to="/book-a-trip" className="form-submit-btn">Go Back</Link>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="page-container selection-page-container">
                <GlowingStarsBackground />
                <AnimatePresence mode="wait">
                    {isLoadingPage ? (
                        <MultiStepLoader loading={isLoadingPage} key="loader" />
                    ) : (
                        <motion.div
                            key="content"
                            className="content-wrapper"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h1 className="selection-title">Here are your personalized suggestions</h1>
                            <p className="selection-subtitle">Based on your preferences, we think you'll love one of these places.</p>
                            <div className="city-cards-grid">
                                {suggestions.map((city, index) => (
                                    <motion.div
                                        key={index}
                                        className="city-card"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <div className="card-content">
                                            <h3 className="card-title">{city.place}</h3>
                                            <p className="card-reason">{city.reason}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCitySelect(city.place)}
                                            className="select-button"
                                            disabled={isLoadingPage}
                                        >
                                            Explore this City
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                            {error && <p className="error-message">{error}</p>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default CitySelection;