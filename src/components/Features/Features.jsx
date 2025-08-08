import React from 'react';
import './Features.css';
import {
    IconAdjustmentsBolt,
    IconMapSearch,
    IconHeartHandshake,
    IconChefHat,
    IconEaseInOut,
    IconTerminal2,
    IconRouteAltLeft,
    IconUsersGroup,
} from "@tabler/icons-react";

// New data tailored to our app
const features = [
    {
        title: "AI-Powered Discovery",
        description: "Our core AI analyzes your travel style to suggest destinations you'll truly love, not just the popular ones.",
        icon: <IconTerminal2 />,
    },
    {
        title: "Hyper-Personalization",
        description: "Adjust every detail, from budget to interests. Our platform crafts a trip that is uniquely yours.",
        icon: <IconAdjustmentsBolt />,
    },
    {
        title: "Smart Itineraries",
        description: "Receive a logical, day-by-day plan that optimizes travel time and lets you experience more.",
        icon: <IconRouteAltLeft />,
    },
    {
        title: "Authentic Culinary Paths",
        description: "Discover the real taste of India with AI-recommended local dishes and hidden culinary gems.",
        icon: <IconChefHat />,
    },
    {
        title: "Find Hidden Gems",
        description: "Our agents are trained to look beyond the tourist traps, finding you unique and memorable experiences.",
        icon: <IconMapSearch />,
    },
    {
        title: "For Every Travel Style",
        description: "Whether you're a solo explorer, a couple, or a family, our plans adapt to your group's needs.",
        icon: <IconUsersGroup />,
    },
    {
        title: "Simple & Intuitive",
        description: "A complex backend doesn't mean a complex interface. Planning your dream trip is just a few clicks away.",
        icon: <IconEaseInOut />,
    },
    {
        title: "Built with Passion",
        description: "This isn't just code; it's a tool built by travelers, for travelers, with a love for India.",
        icon: <IconHeartHandshake />,
    },
];

const Feature = ({ title, description, icon, index }) => {
    return (
        <div className={`feature-item item-${index}`}>
            {/* The gradient overlays for hover effect */}
            {index < 4 && <div className="gradient-overlay-top" />}
            {index >= 4 && <div className="gradient-overlay-bottom" />}
            
            <div className="feature-icon">{icon}</div>
            <div className="feature-title-container">
                <div className="title-bar" />
                <span className="feature-title">{title}</span>
            </div>
            <p className="feature-description">{description}</p>
        </div>
    );
};

const Features = () => {
    return (
        <div className="features-section-new">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    );
};

export default Features;