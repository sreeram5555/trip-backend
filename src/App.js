import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserPreferencesForm from './pages/UserPreferencesForm/UserPreferencesForm';
import CitySelection from './pages/CitySelection/CitySelection';
import SpotCuisineSelection from './pages/SpotCuisineSelection/SpotCuisineSelection';
import Itinerary from './pages/Itinerary/Itinerary';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-a-trip" element={<UserPreferencesForm />} />
          <Route path="/select-city" element={<CitySelection />} />
          <Route path="/select-spots" element={<SpotCuisineSelection />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;