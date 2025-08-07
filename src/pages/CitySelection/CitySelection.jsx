import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import the updated service function
import { getLocalInfo } from '../../services/api';
import './CitySelection.css';
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';

const CitySelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { suggestions, userPreferences } = location.state || { suggestions: [], userPreferences: null };

    const [loadingCity, setLoadingCity] = useState(null);
    const [error, setError] = useState('');

    const handleCitySelect = async (place) => {
        setLoadingCity(place);
        setError('');
        try {
            // Use the new service function with the correct payload structure
            const response = await getLocalInfo(userPreferences, place);
            
            // *CRITICAL CHANGE HERE*
            // Access the 'formatted' object from the response data
            if (response.data && response.data.formatted) {
                navigate('/select-spots', { 
                    state: { 
                        cityDetails: response.data.formatted, // Pass the correct object
                        selectedPlace: place, 
                        userPreferences 
                    } 
                });
            } else {
                 setError('Could not fetch details for this city. Please try another.');
            }
        } catch (err) {
            setError('An error occurred while fetching city details. Please try again.');
            console.error('Error fetching city details:', err);
        } finally {
            setLoadingCity(null);
        }
    };

    if (!suggestions || suggestions.length === 0) {
        // This part is fine, no changes needed
        return (
             <>
                <Navbar />
                <div className="page-container">
                    <h2>No Suggestions Found</h2>
                    <p>Please go back and try different preferences.</p>
                    <button onClick={() => navigate('/book-a-trip')} className="back-button">Go Back</button>
                </div>
            </>
        )
    }

    // JSX is fine, no changes needed
    return (
        <>
            <Navbar />
            <div className="page-container selection-page-container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
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
                                    disabled={loadingCity !== null}
                                >
                                    {loadingCity === city.place ? 'Loading...' : 'Explore this City'}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </motion.div>
            </div>
        </>
    );
};

export default CitySelection;