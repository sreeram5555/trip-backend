import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import the updated service function
import { getSchedule } from '../../services/api';
import './SpotCuisineSelection.css';
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';

const SpotCuisineSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { cityDetails, selectedPlace, userPreferences } = location.state || { cityDetails: { top_attractions: [], local_cuisine: [] } };

    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    const handleSubmit = async () => {
        if (selectedAttractions.length === 0 || selectedCuisines.length === 0) {
            setError('Please select at least one attraction and one cuisine.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            // Use the new service function with the correct payload structure
            const response = await getSchedule(
                userPreferences,
                selectedPlace,
                selectedAttractions,
                selectedCuisines
            );

            // CRITICAL CHANGE HERE
            // Access the 'formatted' object from the response data
            if (response.data && response.data.formatted && response.data.formatted.itinerary) {
                navigate('/itinerary', { 
                    state: { 
                        itineraryData: response.data.formatted, // Pass the correct object
                        place: selectedPlace 
                    } 
                });
            } else {
                setError(response.data.error || 'Failed to create itinerary.');
            }
        } catch (err) {
            setError('An error occurred while creating the itinerary.');
            console.error('Error creating itinerary:', err);
        } finally {
            setLoading(false);
        }
    };

    // The JSX is fine, no changes needed
    return (
        <>
            <Navbar />
            <div className="page-container spot-selection-container">
                 <motion.div
                    className="spot-selection-wrapper"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="selection-title">Customize Your Trip to {selectedPlace}</h1>
                    <p className="selection-subtitle">Select the spots and dishes you'd like to experience.</p>

                    {loading ? (
                         <div className="loader-container">
                           <div className="loader"></div>
                           <p>Building your personalized itinerary...</p>
                        </div>
                    ) : (
                        <>
                            <div className="choices-grid">
                                <section className="choice-section">
                                    <h2>Top Attractions</h2>
                                    <div className="items-list">
                                        {cityDetails.top_attractions.map((item, index) => (
                                            <label key={index} className="checkbox-item">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAttractions.some(att => att.name === item.name)}
                                                    onChange={() => handleAttractionChange(item)}
                                                />
                                                <div className="item-details">
                                                    <strong>{item.name}</strong> ({item.category})
                                                    <p>{item.why_visit}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </section>

                                <section className="choice-section">
                                    <h2>Local Cuisine</h2>
                                    <div className="items-list">
                                        {cityDetails.local_cuisine.map((item, index) => (
                                            <label key={index} className="checkbox-item">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCuisines.some(cui => cui.dish === item.dish)}
                                                    onChange={() => handleCuisineChange(item)}
                                                />
                                                <div className="item-details">
                                                    <strong>{item.dish}</strong>
                                                    <p>{item.description}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </section>
                            </div>
                            <button onClick={handleSubmit} className="generate-btn" disabled={loading}>
                                Generate My Itinerary
                            </button>
                             {error && <p className="error-message">{error}</p>}
                        </>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default SpotCuisineSelection;












