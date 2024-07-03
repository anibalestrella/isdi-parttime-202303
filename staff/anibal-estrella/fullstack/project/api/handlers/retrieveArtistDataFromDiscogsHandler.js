// retrieveArtistDataFromDiscogsHandler.js

const { extractUserId, handleErrors } = require('./helpers');
const { retrieveArtistDataFromDiscogs } = require('../logic');

/**
 * retrieveArtistDataFromDiscogsHandler
 * Handler for retrieveArtistDiscogsHandler search endpoint.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

module.exports = handleErrors(async (req, res) => {
    const { artistId } = req.body;

    if (!artistId) {
        return res.status(400).json({ error: 'artistId parameter is required' });
    }

    // Convert artistId to a number explicitly
    const parsedArtistId = parseInt(artistId, 10); // radix 10 for decimal numbers

    try {
        const results = await retrieveArtistDataFromDiscogs(parsedArtistId);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});
