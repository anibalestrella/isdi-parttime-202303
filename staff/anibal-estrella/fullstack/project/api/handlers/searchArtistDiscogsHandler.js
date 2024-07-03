const { extractUserId, handleErrors } = require('./helpers');
// searchArtistDiscogsHandler.js
const { searchArtistDiscogs } = require('../logic');

/**
 * searchArtistDiscogsHandler
 * Handler for searchArtistDiscogsHandler search endpoint.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

module.exports = async (req, res) => {
    const { artistName } = req.body;

    if (!artistName) {
        return res.status(400).json({ error: 'artistName parameter is required' });
    }

    try {
        const results = await searchArtistDiscogs(artistName);
        res.json(results);
    } catch (error) {
        console.error('Error searching Discogs.com API', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
