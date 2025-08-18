import React from 'react';
import { motion } from 'framer-motion';

const Logistics = ({ transportData, accommodationData }) => {
    return (
        <motion.div className="feature-content-wrapper">
            <h3 className="feature-title">Logistics: Transport & Accommodation</h3>
            <div className="logistics-grid">
                <div className="logistics-section">
                    <h4>Transport Options</h4>
                    <h5>Intercity Travel</h5>
                    <div className="logistics-cards-container">
                        {(transportData?.intercity || []).map((item, i) => (
                            <div className="logistics-card" key={`inter-${i}`}>
                                <strong>{item.mode}</strong> to {item.to}
                                <p>Time: {item.time}, Cost: {item.approx_cost}</p>
                                <p className="pro-tip">Tip: {item.pro_tip}</p>
                            </div>
                        ))}
                    </div>
                    <h5>In-City Travel</h5>
                    <div className="logistics-cards-container">
                        {(transportData?.in_city || []).map((item, i) => (
                            <div className="logistics-card" key={`in-${i}`}>
                                <strong>{item.mode}</strong>
                                <p>Cost: {item.approx_cost}</p>
                                <p className="pro-tip">Use For: {item.when_to_use}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="logistics-section">
                    <h4>Accommodation Suggestions</h4>
                    <h5>Neighborhoods to Consider</h5>
                     <div className="logistics-cards-container">
                        {(accommodationData?.neighborhoods || []).map((item, i) => (
                            <div className="logistics-card" key={`hood-${i}`}>
                                <strong>{item.name}</strong>
                                <p>Good for: {item.good_for?.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                    <h5>Types of Stays</h5>
                    <div className="logistics-cards-container">
                        {(accommodationData?.stays || []).map((item, i) => (
                            <div className="logistics-card" key={`stay-${i}`}>
                                <strong>{item.name} ({item.type})</strong>
                                <p>{item.area} - {item.approx_price_per_night}</p>
                                <p className="pro-tip">Vibe: {item.vibe}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
export default Logistics;