// searchArtistDiscogsHandler.js
const searchArtistDiscogs = require('../logic/searchArtistDiscogs');

/**
 * searchArtistDiscogsHandler
 * Handler for the searchArtistDiscogs search endpoint.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
module.exports = async (req, res) => {
    const { artistName } = req.body;

    if (!artistName) {
        // Client-side error: missing artistName
        return res.status(400).json({ error: 'artistName parameter is required' });
    }

    try {
        const results = await searchArtistDiscogs(artistName);
        res.json(results);
    } catch (error) {
        // Log detailed error for internal debugging
        console.error('Error searching Discogs API:', error);

        // Send error message to client with proper status code
        if (error.message.includes('No results found')) {
            return res.status(404).json({ error: error.message });
        }

        // Return more specific error messages when applicable
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};