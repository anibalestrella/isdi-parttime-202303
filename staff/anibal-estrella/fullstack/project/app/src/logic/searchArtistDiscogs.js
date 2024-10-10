/**
 * Performs a search on Discogs using the provided artistName.
 * @param {string} artistName - The search query string.
 * @returns {Promise<object>} Response data from Discogs API or error object.
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

        // Check if the response is not OK (status code 2xx)
        if (!response.ok) {
            const errorData = await response.json(); // Parse the error message returned from the server
            throw new Error(errorData.error || `Failed to fetch from Discogs API: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // Log the specific error message from the backend or any general error
        console.error(`Failed to search Discogs: ${error.message}`);
        throw new Error(error.message); // Re-throw to be handled by the calling function in the front end
    }
}