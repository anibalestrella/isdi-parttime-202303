// retrieveArtistDataFromTivo.js
/**
 * retrieveArtistDataFromTivo
 * Fetches the artist bio from TiVo Music Metadata API.
 * @param {string} artistName - The name of the artist to fetch the bio for.
 * @returns {Promise<string>} The artist bio or a fallback message if not available.
 * @throws {Error} If there is an error fetching the bio.
 */
const retrieveArtistDataFromTivo = async (artistName) => {
    const url = `https://tivomusicapi-staging-elb.digitalsmiths.net/sd/tivomusicapi/taps/v3/search/artist?name=${encodeURIComponent(artistName)}&limit=5&includeAllFields=true`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to retrieve artist bio from Tivo.com');
        }
        const data = await response.json();
        return data || 'data not available';
    } catch (error) {
        console.error(`Failed to retrieve Tivo.com artist data: ${error.message}`);
        return 'Tivo.com data not available';
    }
}

module.exports = retrieveArtistDataFromTivo;