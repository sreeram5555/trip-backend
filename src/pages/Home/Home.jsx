import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import Footer from '../../components/Footer/Footer';
import './Home.css';

// Import the new components
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import TechStack from '../../components/TechStack/TechStack';
import Testimonials from '../../components/Testimonials/Testimonials';

const Home = () => {
  return (
    <div className="home-page-container">
      <AnimatedBackground /> {/* Add the background component */}
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />      {/* Add the new section */}
        <TechStack />       {/* Add the new section */}
        <Testimonials />    {/* Add the new section */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;