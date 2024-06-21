const { extractUserId, handleErrors } = require('./helpers');
// searchSpotifyHandler.js
const spotifyConfig = require('../config/spotifyConfig');
const searchSpotify = require('../logic/searchSpotify');

/**
 * searchSpotifyHandler
 * Handler for Spotify search endpoint.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
module.exports = async (req, res) => {
    const { artistName } = req.body;

    if (!artistName) {
        return res.status(400).json({ error: 'artistName parameter is required' });
    }

    try {
        const accessToken = await spotifyConfig.getSpotifyAccessToken();
        const results = await searchSpotify(artistName, accessToken);
        res.json(results);
    } catch (error) {
        console.error('Error searching Spotify:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
