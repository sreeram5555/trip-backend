import React from 'react';
import { motion } from 'framer-motion';

const BudgetView = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <p className="feature-placeholder">No budget information available.</p>;
    }

    return (
        <motion.div className="feature-content-wrapper">
            <h3 className="feature-title">Your Trip Budget Breakdown</h3>
            <div className="budget-grid">
                <div className="info-card">
                    <h4>Per-Category Budget Range</h4>
                    <ul>
                        {data.budget_range && Object.entries(data.budget_range).map(([cat, range]) => (
                            <li key={cat}><strong>{cat.charAt(0).toUpperCase() + cat.slice(1)}:</strong> ₹{range[0]} - ₹{range[1]}</li>
                        ))}
                    </ul>
                </div>
                <div className="info-card">
                    <h4>Daily Estimate (Per Person)</h4>
                    <ul>
                        {data.per_day_estimate_per_person && Object.entries(data.per_day_estimate_per_person).map(([cat, val]) => (
                             <li key={cat}><strong>{cat.charAt(0).toUpperCase() + cat.slice(1)}:</strong> {val}</li>
                        ))}
                    </ul>
                </div>
                 <div className="info-card wide-card">
                    <h4>Advisor Notes</h4>
                    <ul>{(data.notes || []).map((note, i) => <li key={i}>{note}</li>)}</ul>
                </div>
            </div>
        </motion.div>
    );
};
export default BudgetView;