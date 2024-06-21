import { validators } from 'com';

// SearchArtistSpotify.js
/**
 * Performs a search on Spotify using the provided artistName.
 * @param {string} artistName - The search query string.
 * @returns {Promise<object>} Response data from Spotify API.
 */
export default async function searchArtistSpotify(artistName) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/spotify-search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ artistName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok', response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to search Spotify: ${error.message}`);
        throw new Error(`Failed to search Spotify: ${error.message}`);
    }
}
