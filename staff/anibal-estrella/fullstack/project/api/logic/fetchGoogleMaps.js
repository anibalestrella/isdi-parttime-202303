require('dotenv').config()

/**
 * logic/fetchGoogleMaps.js
 * @description Fetch Google Maps API key from environment variable
 * @returns {string} Google Maps API key
 * @throws {ExistenceError} If Google Maps API key is
 * 
 */

const { errors: { ApiConnectionError } } = require('com')

const fetchGoogleMaps = async () => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        throw new ApiConnectionError('Google Maps API key is not set');
    }

    return apiKey;
};

module.exports = fetchGoogleMaps;