import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Features from '../../components/Features/Features';
import { InfiniteMovingCards } from '../../components/InfiniteMovingCards/InfiniteMovingCards';
import Footer from '../../components/Footer/Footer';
import Hero from '../../components/Hero/Hero';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page-container">
      <Navbar />
      <main>
        <Hero />
        <div className="content-wrapper">
          <Features />
          <InfiniteMovingCards />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;