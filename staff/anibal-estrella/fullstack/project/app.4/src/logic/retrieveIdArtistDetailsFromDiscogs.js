const BASE_URL = import.meta.env.VITE_BASE_URL
const DISCOGS_API_KEY = import.meta.env.VITE_DISCOGS_API_KEY
const DISCOGS_API_SECRET_KEY = import.meta.env.VITE_DISCOGS_API_SECRET_KEY
import replaceIdsWithNamesInArtistBio from './helpers/replaceIdsWithNamesInArtistBio'

// WIP //sarch by artistId not artistName

async function retrieveArtistDetailsFromDiscogs(artistId) {
    const artistDetails = {};
    try {

        if (artistId) {
            // const artist = artistData.results[0];
            // const artistId = artist.id;

            // Get Artist Profile
            const artistProfileResponse = await fetch(`${BASE_URL}/artists/${artistId}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}`);
            const artistProfileData = await artistProfileResponse.json();

            // Set Artist's Details
            artistDetails.discogsId = artistId;
            artistDetails.discogsUrl = `https://www.discogs.com/artist/${artistId}`;
            artistDetails.name = artistProfileData.name.replace(/\s*\(\d+\)\s*/, '');
            artistDetails.bio = await replaceIdsWithNamesInArtistBio(artistProfileData.profile)
            artistDetails.image = artistProfileData.images.find(image => image.type === 'primary')?.resource_url || null
            if (artistProfileData.urls)
                artistDetails.urls = artistProfileData.urls.filter(url =>
                    url.includes("facebook") ||
                    url.includes("instagram") ||
                    url.includes("wikipedia") ||
                    url.includes("youtube") ||
                    url === artistProfileData.urls[0]
                );


            // Get Artist's Releases
            const releasesResponse = await fetch(`${BASE_URL}/artists/${artistId}/releases?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}`);
            const releasesData = await releasesResponse.json();
            const uniqueReleaseNames = new Set();
            const uniqueReleases = releasesData.releases.filter(release => {
                if (!uniqueReleaseNames.has(release.title)) {
                    uniqueReleaseNames.add(release.title);
                    return true;
                }
                return false;
            });
            const releases = uniqueReleases

            // Set First 5 Albums
            artistDetails.albums = releases.map(release => release.title);

            return artistDetails;

        } else {
            throw new Error(`No results found for artist: ${artistId}`);
        }
    } catch (error) {
        throw new Error(`Error fetching artist data: ${error.message}`);
    }
}
export default retrieveArtistDetailsFromDiscogs;
