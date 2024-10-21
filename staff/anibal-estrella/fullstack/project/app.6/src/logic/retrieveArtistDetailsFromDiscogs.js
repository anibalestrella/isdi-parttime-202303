import { validators } from 'com';

const { validateArtistId } = validators;

/**
 * retrieveArtistDetailsFromDiscogs.js
 * Performs a search on Discogs using the provided artistName.
 * @param {string} artistId - The search query string.
 * @returns {Promise<object>} Response data from Discogs API.
 */

export default async function retrieveArtistDetailsFromDiscogs(artistId) {
    validateArtistId(artistId, 'artist Id')

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/discogs-artist-details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ artistId })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok', response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to search Discogs: ${error.message}`);
        throw new Error(`Failed to search Discogs: ${error.message}`);
    }
}
