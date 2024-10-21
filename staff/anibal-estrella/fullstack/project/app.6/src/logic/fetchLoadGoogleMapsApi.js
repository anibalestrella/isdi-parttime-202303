/**
 * fetchLoadGoogleMapsApi
 * @description Fetches the Google Maps API key from the server, then loads the Google Maps script from Google's servers.
 * @returns {Promise<boolean>} Returns true if the API loaded successfully, false otherwise.
 */
const fetchLoadGoogleMapsApi = async () => {
    try {
        // Fetch the API key from the server
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/google-maps`, {
            method: 'GET', // Use GET to retrieve the API key
            headers: {
                'Content-Type': 'application/json', // Optional, often used for API requests
                // Add any additional headers if required
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch API key');
        }

        const data = await response.json();
        const apiKey = data.apiKey;

        // Load the Google Maps script
        return new Promise((resolve, reject) => {
            if (window.google) {
                resolve(window.google);
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
            script.async = true;
            script.defer = true;

            window.initGoogleMaps = () => {
                resolve(window.google);
            };

            script.onerror = (error) => {
                reject(error);
            };

            document.head.appendChild(script);
        });
    } catch (error) {
        console.error('Error fetching or loading Google Maps API:', error);
        return false; // Indicate that there was an error
    }
};

export default fetchLoadGoogleMapsApi;