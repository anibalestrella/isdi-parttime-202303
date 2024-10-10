// searchArtistDiscogs.js
/**
 * searchArtistDiscogs
 * Fetches the artist bio from Discogs.com Metadata API.
 * @param {string} artistName - The name of the artist to fetch the bio for.
 * @returns {Promise<Array<{ id: number, name: string }>>} A list of artists with id and name.
 * @throws {Error} If there is an error fetching the bio or no results are found.
 */

require('dotenv').config();

module.exports = async (artistName) => {
    const { DISCOGS_BASE_URL, DISCOGS_API_KEY, DISCOGS_API_SECRET_KEY } = process.env;

    const searchUrl = `${DISCOGS_BASE_URL}/database/search?q=${encodeURIComponent(artistName)}&key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}&type=artist&sort=popularity`;

    try {
        const artistResponse = await fetch(searchUrl);

        // Check for non-OK status
        if (!artistResponse.ok) {
            const errorText = await artistResponse.text(); // Read response text in case of error
            throw new Error(`Discogs API Error: ${artistResponse.status} - ${errorText}`);
        }

        const artistData = await artistResponse.json();

        if (artistData.results && artistData.results.length > 0) {
            const firstFiveArtists = artistData.results.slice(0, 5).map(artist => ({
                id: artist.id,
                name: artist.title
            }));
            return firstFiveArtists;
        } else {
            throw new Error(`No results found for artist: ${artistName}`);
        }
    } catch (error) {
        // Re-throw with better context
        throw new Error(`Error fetching artist data from Discogs: ${error.message}`);
    }
};