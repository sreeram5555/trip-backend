import axios from 'axios';

// The URL of your Python FastAPI backend
const API_URL = 'http://127.0.0.1:8000';

/**
 * 1. Generate Place Suggestions
 * @param {object} preferences The user's complete preference object.
 * @returns {Promise} A promise that resolves with place suggestions.
 */
export const generatePlaces = (preferences) => {
  // Endpoint: /generate
  return axios.post(`${API_URL}/generate`, preferences);
};

/**
 * 2. Get Local Info (Attractions & Cuisines)
 * @param {object} preferences The original user preferences.
 * @param {string} selected_place The city the user chose.
 * @returns {Promise} A promise that resolves with city details.
 */
export const getLocalInfo = (preferences, selected_place) => {
  // Endpoint: /local-info
  // Payload must be an object with 'preferences' and 'selected_place' keys.
  return axios.post(`${API_URL}/local-info`, {
    preferences,
    selected_place,
  });
};

/**
 * 3. Get the Final Trip Schedule
 * @param {object} data The final selections for the itinerary.
 * @returns {Promise} A promise that resolves with the generated itinerary.
 */
export const getSchedule = (preferences, selected_place, selected_attractions, selected_cuisines) => {
  // Endpoint: /schedule-trip (Note: your reference had a typo, I've corrected it here)
  // Payload must contain all required keys.
  return axios.post(`${API_URL}/schedule-trip`, {
    preferences,
    selected_place,
    selected_attractions,
    selected_cuisines,
  });
};