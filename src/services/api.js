import axios from 'axios';

// The URL of your Python Flask backend
const API_URL = 'http://127.0.0.1:8000/api';

/**
 * @param {object} preferences User's travel preferences.
 * @returns {Promise} A promise that resolves with city suggestions.
 */
export const suggestCities = (preferences) => {
  return axios.post(`${API_URL}/suggest-cities`, preferences);
};

/**
 * @param {string} place The selected city.
 * @param {object} inputs The original user preferences.
 * @returns {Promise} A promise that resolves with city details (attractions, cuisine).
 */
export const getCityDetails = (place, inputs) => {
  return axios.post(`${API_URL}/city-details`, { place, inputs });
};

/**
 * @param {object} data The final selections for the itinerary.
 * @returns {Promise} A promise that resolves with the generated itinerary.
 */
export const createItinerary = (data) => {
  return axios.post(`${API_URL}/create-itinerary`, data);
};