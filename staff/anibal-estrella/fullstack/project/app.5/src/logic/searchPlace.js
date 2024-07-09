import { cleanWikipediaImageUrl } from './helpers/cleanWikipediaImageUrl';

/**
 * 
 */
const retrievePlacesList = async (placeName) => {
    try {
        // Fetch place details from MusicBrainz API
        const userAgent = 'LiveDive/0.0.1 ( zensirdes@gmail.com )'
        const placeSearchUrl = `https://musicbrainz.org/ws/2/place/?query=${encodeURIComponent(placeName)}&per_page=5&fmt=json`
        const placeResponse = await fetch(placeSearchUrl, {
            headers: {
                'User-Agent': userAgent,
            },
        });
        // const placeResponse = await fetch(placeSearchUrl)
        const placeData = await placeResponse.json();

        let placesList = []
        if (placeData.places.length > 0) {
            //create array of places
            for (let i = 0; i < 5; i++) {
                const place = placeData.places[i]
                const placeId = place.id
                const placeUrl = `https://musicbrainz.org/ws/2/place/${placeId}?inc=url-rels&fmt=json`
                const placeUrlResponse = await fetch(placeUrl, {
                    headers: {
                        'User-Agent': userAgent,
                    },
                });
                const placeUrlData = await placeUrlResponse.json()


                const placeSingle = {
                    placeId: placeUrlData.id,
                    name: placeUrlData.name,
                    city: placeUrlData.area !== null ? placeUrlData.area.name : "some city",
                    homePage: placeUrlData.relations[0] !== undefined && placeUrlData.relations[0].type === "official homepage" ? placeUrlData.relations[0].url.resource : null
                }
                placesList.push(placeSingle)
            }


            // Prepare the MusicBrainz data to return


            return placesList;
        }
        throw new Error(`No place found as ${placeName}, try again!`);
    } catch (error) {
        throw new Error(`Error fetching place data ${error.message}`);
    }
};

export default retrievePlacesList;

