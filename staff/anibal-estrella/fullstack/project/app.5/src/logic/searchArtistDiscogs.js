/**
 * Performs a search on Discogs using the provided artistName.
 * @param {string} artistName - The search query string.
 * @returns {Promise<object>} Response data from Discogs API.
 */
export default async function searchArtistDiscogs(artistName) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/discogs-search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ artistName })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch from Discogs API: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to search Discogs: ${error.message}`);
        throw new Error(`Failed to search Discogs: ${error.message}`);
    }
}
