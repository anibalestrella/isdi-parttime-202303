const { extractUserId, handleErrors } = require('./helpers');
// searchTivoHandler.js
const retrieveArtistDataFromTivo = require('../logic/retrieveArtistDataFromTivo');

/**
 * searchTivoHandler
 * Handler for Tivo search endpoint.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

module.exports = async (req, res) => {
    const { artistName } = req.body;

    if (!artistName) {
        return res.status(400).json({ error: 'artistName parameter is required' });
    }

    try {
        const results = await retrieveArtistDataFromTivo(artistName);
        res.json(results);
    } catch (error) {
        console.error('Error searching Discogs.com:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
