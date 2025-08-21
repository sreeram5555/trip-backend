

import React from 'react';
import { motion } from 'framer-motion';

const PackingList = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <p className="feature-placeholder">No packing list available for this trip.</p>;
    }
    const sections = [
        { title: "Essentials", key: "essentials" }, { title: "Clothing", key: "clothing" }, { title: "Footwear", key: "footwear" },
        { title: "Health & Toiletries", key: "toiletries_health" }, { title: "Gadgets", key: "gadgets" }, { title: "Documents & Money", key: "documents_money" },
    ];
    return (
        <motion.div className="feature-content-wrapper">
            <h3 className="feature-title">Your Personalized Packing List</h3>
            <p className="feature-subtitle">Based on a predicted season of: <strong>{data.season}</strong></p>
            <div className="packing-grid">
                {sections.map(section => (
                    <div className="info-card" key={section.key}>
                        <h4>{section.title}</h4>
                        <ul>
                            {(data[section.key] || []).map((item, i) => (
                                <li key={i}><strong>{item.item}</strong> (Qty: {item.qty})<p className="item-why">{item.why}</p></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
export default PackingList;