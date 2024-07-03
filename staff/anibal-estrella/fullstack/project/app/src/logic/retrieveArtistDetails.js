import { cleanWikipediaImageUrl } from './helpers/cleanWikipediaImageUrl';
import { getWikipediaLinkFromWikidataId } from './helpers/getWikipediaLinkFromWikidataId';
/**
 * 
 */
const retrieveArtistDetails = async (artistName) => {
    debugger
    try {
        // Fetch artist details from MusicBrainz API
        const userAgent = 'LiveDive/0.0.1 ( zensirdes@gmail.com )'
        const artistSearchUrl = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(artistName)}&fmt=json`
        const artistResponse = await fetch(artistSearchUrl, {
            headers: {
                'User-Agent': userAgent,
            },
        });
        const artistData = await artistResponse.json();
        debugger
        if (artistData.artists.length > 0) {
            const artist = artistData.artists[0]
            const artistId = artist.id;
            const artistUrl = `https://musicbrainz.org/ws/2/artist/${artistId}?inc=url-rels&fmt=json`;

            const artistUrlResponse = await fetch(artistUrl);
            const artistUrlData = await artistUrlResponse.json();

            const releasesUrl = `https://musicbrainz.org/ws/2/release-group/?artist=${artistId}&type=album&limit=10&fmt=json`;
            const releasesResponse = await fetch(releasesUrl);
            const releasesData = await releasesResponse.json();

            // get wikidata id
            const wikiDataUrl = artistUrlData.relations.find(obj => obj.type === "wikidata")?.url.resource || null;

            const wikiDataId = wikiDataUrl ? wikiDataUrl.split("/").pop() : null

            const artistDetails = {}
            // const artistDetails = {
            //     artist: artistData.artists[0],
            //     bandDetails: artistUrlData,
            //     albumReleases: releasesData['release-groups'],
            // };

            // Get Wikipedia link and search details using async/await
            try {
                const wikipediaLinkName = await getWikipediaLinkFromWikidataId(wikiDataId);

                const wikiSearchUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&origin=*&exintro&explaintext&generator=search&gsrsearch=intitle:${wikipediaLinkName}&gsrlimit=1&redirects=1`

                const wikiResponse = await fetch(wikiSearchUrl, { method: "GET" });

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
                const wikiArticleUrl = `https://en.wikipedia.org/wiki/${wikipediaLinkName}`;

                // Add Wikipedia data to the artistDetails object
                artistDetails.bio = wikiExtract;
                if (wikiImage)
                    artistDetails.image = cleanWikipediaImageUrl(wikiImage);

                artistDetails.wiki = wikiArticleUrl
                artistDetails.name = artist.name
                artistDetails.from = artist.area.name
                artistDetails.albums = releasesData['release-groups']

                return artistDetails;
            } catch (error) {
                console.error("Error:", error);
            }
        }

        throw new Error(`No artist found as ${artistName}, try again!`);
    } catch (error) {
        console.error('Error fetching artist details:', error);
    }
};

export default retrieveArtistDetails;

