import { validators } from 'com';

const { validateArtistName } = validators;

// SearchArtistTivoApi.js
/**
 * Performs a search on tivo using the provided artistName.
 * @param {string} artistName - The search query string.
 * @returns {Promise<object>} Response data from tivo API.
 */
export default async function searchArtistTivoApi(artistName) {
    validateArtistName(artistName, 'artist Name')

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tivo-search`, {
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
        console.error(`Failed to search tivo: ${error.message}`);
        throw new Error(`Failed to search tivo: ${error.message}`);
    }
}
