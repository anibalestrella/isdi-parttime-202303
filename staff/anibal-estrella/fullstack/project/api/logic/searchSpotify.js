const { validators: { validateId, validateText },
    errors: { ExistenceError, ApiConnectionError, FormatError } } = require('com')


/**
 * Performs a search on Spotify using the provided artistName and access token.
 * @param {string} artistName - The search artistName string.
 * @param {string} accessToken - Spotify access token.
 * @returns {Promise<object>} Response data from Spotify API.
 */
const searchSpotify = async (artistName, accessToken) => {
    try {
        validateText(artistName, 'artistName');
    } catch (error) {
        throw new FormatError('Invalid artist name');
    }

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=5`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new ApiConnectionError(`Spotify API request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new ApiConnectionError(`Error connecting to Spotify API: ${error.message}`);
    }
};

module.exports = searchSpotify;