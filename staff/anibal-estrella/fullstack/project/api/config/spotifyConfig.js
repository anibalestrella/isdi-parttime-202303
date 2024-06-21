const https = require('https');
const querystring = require('querystring');

/**
 * Retrieves Spotify access token using client credentials flow.
 * @returns {Promise<string>} Access token for Spotify API.
 */
function getSpotifyAccessToken() {
    return new Promise((resolve, reject) => {
        const authOptions = {
            hostname: 'accounts.spotify.com',
            path: '/api/token',
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const postData = querystring.stringify({
            'grant_type': 'client_credentials'
        });

        const req = https.request(authOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData.access_token);
                } else {
                    reject(new Error('Failed to retrieve access token'));
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

module.exports = {
    getSpotifyAccessToken
};
