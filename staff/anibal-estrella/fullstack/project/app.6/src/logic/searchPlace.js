import { cleanWikipediaImageUrl } from './helpers/cleanWikipediaImageUrl';

/**
 * Retrieve a list of places from MusicBrainz based on a place name.
 * @param {string} placeName - The name of the place to search for.
 * @returns {Promise<Array>} - A promise that resolves to an array of places.
 */
const retrievePlacesList = async (placeName) => {
    const userAgent = 'LiveDive/0.0.1 ( zensirdes@gmail.com )';
    const placeSearchUrl = `https://musicbrainz.org/ws/2/place/?query=${encodeURIComponent(placeName)}&per_page=5&fmt=json`;

    try {
        // Fetch place details from MusicBrainz API
        const placeResponse = await fetch(placeSearchUrl, {
            headers: { 'User-Agent': userAgent },
        });

        if (!placeResponse.ok) {
            throw new Error(`Error fetching place data: ${placeResponse.statusText}`);
        }

        const placeData = await placeResponse.json();

        if (!placeData.places || placeData.places.length === 0) {
            throw new Error(`No place found as ${placeName}, try again!`);
        }

        // Fetch detailed information for each place concurrently
        const placeDetailsPromises = placeData.places.slice(0, 5).map(async (place) => {
            const placeUrl = `https://musicbrainz.org/ws/2/place/${place.id}?inc=url-rels&fmt=json`;
            const placeUrlResponse = await fetch(placeUrl, {
                headers: { 'User-Agent': userAgent },
            });

            if (!placeUrlResponse.ok) {
                throw new Error(`Error fetching place URL data: ${placeUrlResponse.statusText}`);
            }

            const placeUrlData = await placeUrlResponse.json();

            return {
                placeId: placeUrlData.id,
                name: placeUrlData.name,
                city: placeUrlData.area ? placeUrlData.area.name : "some city",
                homePage: placeUrlData.relations?.find(rel => rel.type === "official homepage")?.url.resource || null,
            };
        });

        // Resolve all place details promises
        const placesList = await Promise.all(placeDetailsPromises);

        return placesList;
    } catch (error) {
        throw new Error(`Error fetching place data: ${error.message}`);
    }
};

export default retrievePlacesList;
