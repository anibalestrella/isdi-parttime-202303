// searchArtistDiscogs.js
/**
 * searchArtistDiscogs
 * Fetches the artist bio from Discogs.com Metadata API.
 * @param {string} artistName - The name of the artist to fetch the bio for.
 * @returns {Promise<string>} The artist bio or a fallback message if not available.
 * @throws {Error} If there is an error fetching the bio.
 */

require('dotenv').config();

module.exports = async (artistName) => {

    try {
        const { DISCOGS_BASE_URL, DISCOGS_API_KEY, DISCOGS_API_SECRET_KEY } = process.env;

        const searchUrl = `${DISCOGS_BASE_URL}/database/search?q=${encodeURIComponent(artistName)}&key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}&type=artist&sort=popularity`;

        const artistResponse = await fetch(searchUrl);
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
        throw new Error(`Error fetching artist data: ${error.message}`);
    }
}
