import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getSchedule } from '../../services/api';
import './SpotCuisineSelection.css';
import Navbar from '../../components/Navbar/Navbar';
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import MultiStepLoader from '../../components/MultiStepLoader/MultiStepLoader';
import { motion, AnimatePresence } from 'framer-motion';

const SpotCuisineSelection = () => {
    // Hooks and State from the working "previous" version
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Safety check from the newer version to prevent crashes
    if (!location.state || !location.state.cityDetails || !location.state.selectedPlace) {
        return (
            <div className="page-container spot-selection-container">
                <Navbar />
                <GlowingStarsBackground />
                <div className="spot-selection-wrapper" style={{ zIndex: 1, textAlign: 'center' }}>
                    <h2 className="selection-title">Oops! Something went wrong.</h2>
                    <p className="selection-subtitle">We couldn't find city details. Please select a city again.</p>
                    <Link to="/book-a-trip" className="form-submit-btn" style={{textDecoration: 'none', display: 'inline-block'}}>
                        Start Over
                    </Link>
                </div>
            </div>
        );
    }
    
    const { cityDetails, selectedPlace, userPreferences } = location.state;

    // Handler functions from the working "previous" version
    const handleAttractionChange = (attraction) => {
        setSelectedAttractions(prev =>
            prev.some(item => item.name === attraction.name)
                ? prev.filter(item => item.name !== attraction.name)
                : [...prev, attraction]
        );
    };

    const handleCuisineChange = (cuisine) => {
        setSelectedCuisines(prev =>
            prev.some(item => item.dish === cuisine.dish)
                ? prev.filter(item => item.dish !== cuisine.dish)
                : [...prev, cuisine]
        );
    };

    // --- FINAL CORRECTED handleSubmit LOGIC ---
    // This uses the bug-free logic from your "previous" version.
    const handleSubmit = async () => {
        if (selectedAttractions.length === 0 && selectedCuisines.length === 0) {
            setError('Please select at least one attraction or cuisine.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            // The critical step: sending the full objects as expected by this logic path.
            // Your api.js file already handles the mapping to names.
            const response = await getSchedule(
                userPreferences,
                selectedPlace,
                selectedAttractions, // Sending the array of objects
                selectedCuisines     // Sending the array of objects
            );
            
            if (response.data && response.data.formatted && response.data.formatted.itinerary) {
                navigate('/itinerary', { state: { itineraryData: response.data.formatted, place: selectedPlace } });
            } else {
                setError(response.data.error || 'Failed to create itinerary.');
                setLoading(false);
            }
        } catch (err) {
            console.error("API Error:", err.response ? err.response.data : err);
            setError('An error occurred while creating the itinerary.');
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="page-container spot-selection-container">
                <GlowingStarsBackground />
                <AnimatePresence mode="wait">
                    {loading ? (
                        <MultiStepLoader loading={loading} key="loader" />
                    ) : (
                        <motion.div
                            key="content"
                            className="spot-selection-wrapper"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="selection-title">Customize Your Trip to {selectedPlace}</h1>
                            <p className="selection-subtitle">Select the spots and dishes you'd like to experience.</p>
                            
                            <div className="choices-grid">
                                <motion.section 
                                    className="choice-section"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <h2>Top Attractions</h2>
                                    <div className="items-list">
                                        {(cityDetails.top_attractions || []).map((item) => {
                                            if (!item?.name) return null; 
                                            const isSelected = selectedAttractions.some(att => att.name === item.name);
                                            return (
                                                <motion.div
                                                    key={item.name}
                                                    className={`selection-card ${isSelected ? 'selected' : ''}`}
                                                    onClick={() => handleAttractionChange(item)}
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                                >
                                                    <div className="custom-checkbox">{isSelected && <div className="checkbox-tick" />}</div>
                                                    <div className="item-details">
                                                        <strong>{item.name}</strong>
                                                        <span>({item.category})</span>
                                                        <p>{item.why_visit}</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.section>
                                <motion.section 
                                    className="choice-section"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <h2>Local Cuisine</h2>
                                    <div className="items-list">
                                        {(cityDetails.local_cuisine || []).map((item) => {
                                            if (!item?.dish) return null;
                                            const isSelected = selectedCuisines.some(cui => cui.dish === item.dish);
                                            return (
                                                <motion.div
                                                    key={item.dish}
                                                    className={`selection-card ${isSelected ? 'selected' : ''}`}
                                                    onClick={() => handleCuisineChange(item)}
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                                >
                                                    <div className="custom-checkbox">{isSelected && <div className="checkbox-tick" />}</div>
                                                    <div className="item-details">
                                                        <strong>{item.dish}</strong>
                                                        <p>{item.description}</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.section>
                            </div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                                <button onClick={handleSubmit} className="generate-btn" disabled={loading}>
                                    Generate My Itinerary
                                </button>
                                {error && <p className="error-message">{error}</p>}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default SpotCuisineSelection;