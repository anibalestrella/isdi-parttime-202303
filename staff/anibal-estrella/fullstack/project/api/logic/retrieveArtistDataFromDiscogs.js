require('dotenv').config();
// retrieveArtistDataFromDiscogs.js
/**
 * retrieveArtistDataFromDiscogs
 * Fetches the artist bio from discogs Music Metadata API.
 * @param {string} artistName - The name of the artist to fetch the bio for.
 * @returns {Promise<string>} The artist bio or a fallback message if not available.
 * @throws {Error} If there is an error fetching the bio.
 */
const { discogsParser } = require('../logic/helpers');

const { validators: { validateArtistId },
    errors: { ExistenceError } } = require('com')


const retrieveArtistDataFromDiscogs = async (artistId) => {
    validateArtistId(artistId, 'artist ID');

    const { DISCOGS_BASE_URL, DISCOGS_API_KEY, DISCOGS_API_SECRET_KEY } = process.env;

    const artistDetails = {};

    try {
        if (artistId) {
            // const artist = artistData.results[0];
            // const artistId = artist.id;

            // Get Artist Profile
            const artistProfileResponse = await fetch(`${DISCOGS_BASE_URL}/artists/${artistId}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}`);
            const artistProfileData = await artistProfileResponse.json();

            // Set Artist's Details
            artistDetails.discogsId = artistId;
            artistDetails.discogsUrl = `https://www.discogs.com/artist/${artistId}`;
            artistDetails.name = artistProfileData.name.replace(/\s*\(\d+\)\s*/, '');
            // artistDetails.bio = artistProfileData.profile
            artistDetails.bio = await discogsParser(artistProfileData.profile)
            artistDetails.image = Array.isArray(artistProfileData.images)
                ? artistProfileData.images.find(image => image.type === 'primary')?.resource_url || null
                : null;

            if (artistProfileData.urls)
                artistDetails.urls = artistProfileData.urls.filter(url =>
                    url.includes("facebook") ||
                    url.includes("instagram") ||
                    url.includes("wikipedia") ||
                    url.includes("youtube") ||
                    url === artistProfileData.urls[0]
                );


            // Get Artist's Releases
            const releasesResponse = await fetch(`${DISCOGS_BASE_URL}/artists/${artistId}/releases?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}`);
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

    }
}

module.exports = retrieveArtistDataFromDiscogs;