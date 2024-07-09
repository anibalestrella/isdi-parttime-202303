import { cleanWikipediaImageUrl } from './helpers/cleanWikipediaImageUrl';
/**
 * 
 */
const retrievePlaceDetails = async (placeName) => {
    try {
        // Fetch place details from MusicBrainz API
        const userAgent = 'LiveDive/0.0.1 ( zensirdes@gmail.com )'
        const placeSearchUrl = `https://musicbrainz.org/ws/2/place/?query=${encodeURIComponent(placeName)}&fmt=json`
        const placeResponse = await fetch(placeSearchUrl, {
            headers: {
                'User-Agent': userAgent,
            },
        });
        const placeData = await placeResponse.json();

        if (placeData.places.length > 0) {
            const placeId = placeData.places[0].id;
            const placeUrl = `https://musicbrainz.org/ws/2/place/${placeId}?inc=tags&fmt=json`;

            const bandResponse = await fetch(placeUrl);
            const bandData = await bandResponse.json();

            const releasesUrl = `https://musicbrainz.org/ws/2/release-group/?place=${placeId}&type=album&limit=10&fmt=json`;
            const releasesResponse = await fetch(releasesUrl);
            const releasesData = await releasesResponse.json();

            // Prepare the MusicBrainz data to return
            const placeDetails = {
                place: placeData.places[0],
                bandDetails: bandData,
                albumReleases: releasesData['release-groups'],
            };
            debugger
            // Fetch place details from Wikipedia API
            // const wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&origin=*&format=json&exintro&explaintext&titles=${encodeURIComponent(placeDetails.place.name)}`;
            const wikiSearchUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&origin=*&exintro&explaintext&generator=search&gsrsearch=intitle:${encodeURIComponent(placeDetails.place.name)}&gsrlimit=1&redirects=1`;

            const wikiResponse = await fetch(wikiSearchUrl, {
                method: "GET"
            });
            const wikiData = await wikiResponse.json();

            function getFirst50Words(inputString) {
                const wordsArray = inputString.trim().split(/\s+/);
                const first50Words = wordsArray.slice(0, 100).join(" ");
                return wordsArray.length <= 50 ? inputString : `${first50Words}...`;
            }

            // Extract relevant information from Wikipedia response
            const pageId = Object.keys(wikiData.query.pages)[0];
            const wikiExtract = getFirst50Words(wikiData.query.pages[pageId].extract);
            const wikiImage = wikiData.query.pages[pageId].thumbnail?.source || null;
            const wikiArticleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(placeDetails.place.name)}`;

            // Add Wikipedia data to the placeDetails object
            placeDetails.bio = wikiExtract;
            placeDetails.image = cleanWikipediaImageUrl(wikiImage);
            placeDetails.wiki = wikiArticleUrl;

            return placeDetails;
        }
        throw new Error(`No place found as ${placeName}, try again!`);
    } catch (error) {
        console.error('Error fetching place details:', error);
    }
};

export default retrievePlaceDetails;

