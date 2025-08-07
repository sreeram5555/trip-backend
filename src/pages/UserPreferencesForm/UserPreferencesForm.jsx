import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import the updated service function
import { generatePlaces } from '../../services/api';
import './UserPreferencesForm.css';
import Navbar from '../../components/Navbar/Navbar';
import { motion } from 'framer-motion';

const UserPreferencesForm = () => {
    const [formData, setFormData] = useState({
        travel_type: 'Adventure',
        min_budget: '15000',
        max_budget: '50000',
        duration: '7',
        interests: 'Mountains, Food, History',
        group_type: 'Couple',
        no_of_people: '2',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = {
            travel_type: formData.travel_type,
            budget_range: [parseInt(formData.min_budget), parseInt(formData.max_budget)],
            duration: parseInt(formData.duration),
            no_of_people: parseInt(formData.no_of_people),
            interests: formData.interests,
            group_type: formData.group_type
        };

        try {
            // Use the new service function
            const response = await generatePlaces(payload);

            // *CRITICAL CHANGE HERE*
            // Access the 'places' array from the response data
            if (response.data && response.data.places && response.data.places.length > 0) {
                navigate('/select-city', { 
                    state: { 
                        suggestions: response.data.places, // Pass the correct array
                        userPreferences: payload 
                    } 
                });
            } else {
                setError('No suggestions found. Please try different preferences.');
            }
        } catch (err) {
            setError('Failed to fetch suggestions. Please check the backend and try again.');
            console.error('Error fetching city suggestions:', err);
        } finally {
            setLoading(false);
        }
    };

    // The JSX remains the same as the last version, no changes needed there.
    // ... copy the return (...) part from the previous response ...
    return (
        <>
            <Navbar />
            <div className="page-container form-page-container">
                <motion.div
                    className="form-wrapper"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="form-title">Design Your Dream Trip</h1>
                    <p className="form-subtitle">Fill in your preferences and let our AI find the perfect destinations for you.</p>

                    {loading ? (
                        <div className="loader-container">
                           <div className="loader"></div>
                           <p>Finding destinations...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="preferences-form">
                            <div className="form-grid">
                                <div className="form-group form-group-full">
                                    <label htmlFor="interests">What are your interests? (e.g., Hiking, Beaches)</label>
                                    <input id="interests" type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g., Hiking, Temples, Beaches, Foodie" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="min_budget">Min Budget (INR)</label>
                                    <input id="min_budget" type="number" name="min_budget" value={formData.min_budget} onChange={handleChange} placeholder="e.g., 15000" min="0" step="1000" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="max_budget">Max Budget (INR)</label>
                                    <input id="max_budget" type="number" name="max_budget" value={formData.max_budget} onChange={handleChange} placeholder="e.g., 50000" min="0" step="1000" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="duration">Trip Duration (days)</label>
                                    <input id="duration" type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 7" min="1" required />
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="no_of_people">Number of People</label>
                                    <input id="no_of_people" type="number" name="no_of_people" value={formData.no_of_people} onChange={handleChange} placeholder="e.g., 2" min="1" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="travel_type">Type of Travel</label>
                                    <select id="travel_type" name="travel_type" value={formData.travel_type} onChange={handleChange}>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Relaxation">Relaxation</option>
                                        <option value="Cultural">Cultural</option>
                                        <option value="Spiritual">Spiritual</option>
                                        <option value="Historical">Historical</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="group_type">Travel Group</label>
                                    <select id="group_type" name="group_type" value={formData.group_type} onChange={handleChange}>
                                        <option value="Solo">Solo</option>
                                        <option value="Couple">Couple</option>
                                        <option value="Family">Family</option>
                                        <option value="Friends">Friends</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="form-submit-btn" disabled={loading}>
                                Find Destinations
                            </button>
                            {error && <p className="error-message">{error}</p>}
                        </form>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default UserPreferencesForm;