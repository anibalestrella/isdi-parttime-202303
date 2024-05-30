const BASE_URL = import.meta.env.VITE_BASE_URL;
const DISCOGS_API_KEY = import.meta.env.VITE_DISCOGS_API_KEY;
const DISCOGS_API_SECRET_KEY = import.meta.env.VITE_DISCOGS_API_SECRET_KEY;
import replaceIdsWithNamesInArtistBio from './helpers/replaceIdsWithNamesInArtistBio';

/**
 * Search for an artist name on Discogs using the Discogs API
 * @param {string} artistName 
 * @returns {Array} Array of first 5 artist objects with id and name, e.g., [{ id: 175395, name: "Artist1" }, ...]
 */
async function searchArtists(artistName) {
    try {
        const artistResponse = await fetch(`${BASE_URL}/database/search?q=${encodeURIComponent(artistName)}&key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}&type=artist&sort=popularity`);
        const artistData = await artistResponse.json();

        if (artistData.results.length > 0) {
            // Map over the results to get the first 5 artists and create objects with their ids and names
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

export default searchArtists;
