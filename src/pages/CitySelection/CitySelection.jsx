import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { mlApi } from '../../services/api';
import './CitySelection.css';
import Navbar from '../../components/Navbar/Navbar';
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import { motion } from 'framer-motion';
// Import our new, smart component
import CityCard from './components/CityCard';

const CitySelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loadingCity, setLoadingCity] = useState(null);
    const [error, setError] = useState('');

    const suggestions = location.state?.suggestions || [];
    const userPreferences = location.state?.userPreferences;

    if (!userPreferences) {
        return (
             <div className="page-container selection-page-container">
                <Navbar /> <GlowingStarsBackground />
                <div className="content-wrapper">
                    <h2 className="selection-title">Oops! Something went wrong.</h2>
                    <p className="selection-subtitle">We don't have your preferences. Please start again.</p>
                    <Link to="/book-a-trip" className="form-submit-btn" style={{textDecoration: 'none', display: 'inline-block'}}>Go Back</Link>
                </div>
            </div>
        );
    }

    const handleCitySelect = async (place) => {
        setLoadingCity(place);
        setError('');
        try {
            const response = await mlApi.getLocalInfo(userPreferences, place); 
            if (response.data?.formatted) {
                navigate('/select-spots', { 
                    state: { 
                        cityDetails: response.data.formatted, 
                        selectedPlace: place, 
                        userPreferences,
                        suggestions // Pass all data forward
                    } 
                });
            } else { setError('Could not fetch details for this city.'); }
        } catch (err) { setError('An error occurred while fetching city details.');
        } finally { setLoadingCity(null); }
    };

    return (
        <>
            <Navbar />
            <div className="page-container selection-page-container">
                <GlowingStarsBackground />
                <motion.div className="content-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="selection-title">Step 2 — Pick your destination</h1>
                    <p className="selection-subtitle">Here are the top destinations tailored to your preferences, with key comparison info.</p>
                    
                    <div className="city-list-container">
                        {suggestions.map((city, index) => (
                            <CityCard 
                                key={city.place}
                                city={city}
                                onSelect={handleCitySelect}
                                isLoading={loadingCity === city.place}
                            />
                        ))}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </motion.div>
            </div>
        </>
    );
};

export default CitySelection;