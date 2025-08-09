import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getLocalInfo } from '../../services/api';
import './CitySelection.css';
import Navbar from '../../components/Navbar/Navbar';
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import { motion } from 'framer-motion';

const CitySelection = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loadingCity, setLoadingCity] = useState(null);
    const [error, setError] = useState('');

    if (!location.state || !location.state.suggestions || !location.state.userPreferences) {
        return (
            <>
                <Navbar />
                <div className="page-container selection-page-container">
                    <GlowingStarsBackground />
                    <div className="content-wrapper">
                        <h2 className="selection-title">Oops! Something went wrong.</h2>
                        <p className="selection-subtitle">We don't have your preferences. Please start again.</p>
                        <Link to="/book-a-trip" className="form-submit-btn" style={{textDecoration: 'none', display: 'inline-block'}}>
                            Go Back to Form
                        </Link>
                    </div>
                </div>
            </>
        );
    }
    
    const { suggestions, userPreferences } = location.state;

    const handleCitySelect = async (place) => {
        setLoadingCity(place);
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
            }
        } catch (err) {
            setError('An error occurred while fetching city details. Please try again.');
        } finally {
            setLoadingCity(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className="page-container selection-page-container">
                <GlowingStarsBackground />
                <motion.div
                    className="content-wrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h1 className="selection-title">Here are your personalized suggestions</h1>
                    <p className="selection-subtitle">Based on your preferences, we think you'll love one of these places.</p>
                    
                    <div className="city-list-container">
                        {suggestions.map((city, index) => {
                            const hasPhotos = city.photos && city.photos.length > 0;
                            return (
                                <motion.div
                                    key={city.place}
                                    className="city-item"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                >
                                    <div className="item-details">
                                        <h2 className="item-title">{city.place}</h2>
                                        <p className="item-reason">{city.reason}</p>
                                        <button
                                            onClick={() => handleCitySelect(city.place)}
                                            className="select-button"
                                            disabled={loadingCity !== null}
                                        >
                                            {loadingCity === city.place ? 'Loading...' : 'Explore this City'}
                                        </button>
                                    </div>
                                    {hasPhotos && (
                                        <div className="item-photos">
                                            {city.photos.slice(0, 3).map((photoUrl, photoIndex) => (
                                                <div className="photo-container" key={photoIndex}>
                                                    <img src={photoUrl} alt={`${city.place} view ${photoIndex + 1}`} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </motion.div>
            </div>
        </>
    );
};

export default CitySelection;