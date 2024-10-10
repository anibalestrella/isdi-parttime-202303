const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateId, validateArtistId, validateUrl }
} = require('com');

const { User, Artist } = require('../data-project/models.js');

module.exports = (userId, discogsId, name, discogsUrl, image = '', albums = [], bio = '', urls = []) => {

    const action = 'Adding Artist to DB >'

    // Validate inputs
    validateId(userId, `${action} User id`);
    validateArtistId(discogsId, `${action} Discogs ID of the artist`);
    validateText(name, `${action} Name of the artist`);
    validateUrl(discogsUrl, `${action} Discogs URL of the artist`);

    if (image) validateUrl(image, `${action} Image URL`);
    if (!Array.isArray(albums)) throw new ContentError(`${action} Albums must be an array of strings`);
    if (albums.some(album => typeof album !== 'string')) throw new ContentError(`${action} Each album must be a string`);
    if (!Array.isArray(urls)) throw new ContentError(`${action} URLs must be an array of strings`);
    if (urls.some(url => typeof url !== 'string')) throw new ContentError(`${action} Each URL must be a string`);

    // Check if an artist with the same discogsId already exists
    return Artist.findOne({ discogsId })
        .then(existingArtist => {
            if (existingArtist) {
                throw new ExistenceError(`An artist with Discogs ID ${discogsId} already exists`);
            } else {
                // Check if the user exists
                return User.findById(userId)
                    .then(user => {
                        if (!user) throw new ExistenceError(`User with id ${userId} does not exist`);

                        // Create the artist if user exists
                        return Artist.create({
                            author: userId,
                            discogsId,
                            name,
                            discogsUrl: [discogsUrl],  // Store URL as an array
                            image,
                            albums,
                            bio,
                            urls
                        });
                    });
            }
        });
};