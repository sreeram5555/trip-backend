import React, { useState, useEffect } from 'react';
import { authApi } from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import GlowingStarsBackground from '../../components/GlowingStarsBackground/GlowingStarsBackground';
import { motion, AnimatePresence } from 'framer-motion';
import './Profile.css';

// Import all the necessary components for the dashboard view
import ItineraryTimeline from '../Itinerary/components/ItineraryTimeline';
import SafetyInfo from '../Itinerary/components/SafetyInfo';
import PackingList from '../Itinerary/components/PackingList';
import BudgetView from '../Itinerary/components/BudgetView';
import Logistics from '../Itinerary/components/Logistics';
import Gallery from '../Itinerary/components/Gallery'; // <-- Import the new Gallery component

// This component renders the full trip plan when a card is selected
const TripPlanViewer = ({ tripPlan, onBack }) => {
    const [activeTab, setActiveTab] = useState('Itinerary');
    // --- ADD "Gallery" to the tabs array ---
    const tabs = ['Itinerary', 'Gallery', 'Safety', 'Packing', 'Budget', 'Logistics'];

    const renderContent = () => {
        switch (activeTab) {
            case 'Itinerary': return <ItineraryTimeline itineraryData={tripPlan.itinerary} />;
            case 'Gallery': return <Gallery suggestions={tripPlan.suggestions} selectedPlace={tripPlan.selected_place} />;
            case 'Safety': return <SafetyInfo data={tripPlan.safety} />;
            case 'Packing': return <PackingList data={tripPlan.packing} />;
            case 'Budget': return <BudgetView data={tripPlan.budget} />;
            case 'Logistics': return <Logistics transportData={tripPlan.transport} accommodationData={tripPlan.accommodation} />;
            default: return null;
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={onBack} className="back-to-trips-btn">← Back to All Trips</button>
            <div className="itinerary-wrapper profile-view">
                <h1 className="itinerary-title">Your Trip to {tripPlan.selected_place}</h1>
                <p className="itinerary-subtitle">Saved on: {new Date(tripPlan.createdAt).toLocaleDateString()}</p>
                 <div className="dashboard-tabs">
                    {tabs.map(tab => (
                        <button key={tab} className={`tab-button ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                            {tab}
                            {activeTab === tab && <motion.div className="active-tab-underline" layoutId="profile-underline" />}
                        </button>
                    ))}
                </div>
                <div className="dashboard-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const Profile = () => {
    const [adventures, setAdventures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                const response = await authApi.getMyAdventures();
                setAdventures(response.data.adventures.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (error) {
                console.error("Failed to fetch adventures:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdventures();
    }, []);

    if (loading) {
        return <div className="loading-full-page">Loading Your Profile...</div>;
    }

    return (
        <div className="page-container profile-page-container">
            <Navbar />
            <GlowingStarsBackground />
            <div className="profile-content-wrapper">
                <AnimatePresence mode="wait">
                    {selectedTrip ? (
                        <motion.div key="viewer">
                            <TripPlanViewer tripPlan={selectedTrip} onBack={() => setSelectedTrip(null)} />
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h1 className="profile-title">My Saved Trips</h1>
                            <div className="adventures-list">
                                {adventures.length > 0 ? adventures.map(({ _id, tripPlan, createdAt }) => {
                                    const previewImage = tripPlan?.suggestions?.[0]?.photos?.[0];
                                    const placeName = tripPlan?.selected_place || 'Untitled Trip';
                                    const duration = tripPlan?.preferences?.duration;
                                    const travelType = tripPlan?.preferences?.travel_type;

                                    return (
                                        <motion.div
                                            key={_id} 
                                            className="adventure-card"
                                            onClick={() => setSelectedTrip({ ...tripPlan, createdAt })}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ y: -5 }}
                                        >
                                            <div 
                                                className="card-image-preview" 
                                                style={{
                                                    backgroundImage: previewImage 
                                                        ? `url('${previewImage}')` 
                                                        : 'linear-gradient(135deg, var(--background-light), var(--background-color))'
                                                }} 
                                            />
                                            <div className="card-content-overlay">
                                                <h3>{placeName}</h3>
                                                {(duration && travelType) && (
                                                    <p>{duration} Days • {travelType}</p>
                                                )}
                                                <span className="card-date">Saved on: {new Date(createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </motion.div>
                                    );
                                }) : <p className="no-trips-message">You have no saved trips yet. Plan one now!</p>}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
export default Profile;