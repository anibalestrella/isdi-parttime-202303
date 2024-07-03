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

    try {
        const results = await retrieveArtistDataFromDiscogs(artistId);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});



