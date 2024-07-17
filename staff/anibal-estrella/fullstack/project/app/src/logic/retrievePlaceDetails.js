import { cleanWikipediaImageUrl } from './helpers/cleanWikipediaImageUrl';

/**
 * Fetches place details from MusicBrainz and Wikipedia.
 * @param {string} placeId - The MusicBrainz place ID.
 * @returns {Object} placeDetails - The detailed information of the place.
 */
const retrievePlaceDetails = async (placeId) => {
    try {
        // Fetch place details from MusicBrainz API
        const userAgent = 'LiveDive/0.0.1 (zensirdes@gmail.com)';
        const placeSearchUrl = `https://musicbrainz.org/ws/2/place/?query=${encodeURIComponent(placeId)}&fmt=json`;
        const placeResponse = await fetch(placeSearchUrl, {
            headers: {
                'User-Agent': userAgent,
            },
        });
        const placeData = await placeResponse.json();

        if (placeData.places.length > 0) {
            const placeDetailId = placeData.places[0].id;
            const placeDetailUrl = `https://musicbrainz.org/ws/2/place/${placeDetailId}?inc=tags&fmt=json`;
            const placeDetailResponse = await fetch(placeDetailUrl);
            const placeDetailsData = await placeDetailResponse.json();

            // Initialize place details object
            const placeDetails = {
                name: placeDetailsData.name,
                type: placeDetailsData.type,
                address: placeDetailsData.address,
                city: placeDetailsData.area.name,
                geolocationCoordinates: placeDetailsData.coordinates
            };

            // Fetch additional info from Wikipedia API
            const wikipediaSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(placeDetailsData.name)}&utf8=&format=json&origin=*`;
            const wikipediaResponse = await fetch(wikipediaSearchUrl);
            const wikipediaData = await wikipediaResponse.json();

            if (wikipediaData.query.search.length > 0) {
                const wikipediaPageTitle = wikipediaData.query.search[0].title;

                // Check if the Wikipedia page title matches the place name
                if (wikipediaPageTitle.toLowerCase() === placeDetailsData.name.toLowerCase()) {
                    const wikipediaPageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(wikipediaPageTitle)}`;

                    // Add Wikipedia info to place details
                    placeDetails.info = {
                        wikipediaTitle: wikipediaPageTitle,
                        wikipediaUrl: wikipediaPageUrl
                    };
                }
            }

            console.log(placeDetails);
            return placeDetails;
        }

        throw new Error(`No place found with ID ${placeId}, try again!`);
    } catch (error) {
        console.error('Error fetching place details:', error);
    }
};

export default retrievePlaceDetails;
