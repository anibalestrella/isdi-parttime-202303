const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateId, validateArtistId }
} = require('com');

const { User, Artist } = require('../data-project/models.js');

module.exports = (userId, id, name) => {
    validateId(userId, 'User id');
    validateArtistId(id, 'Artist id');
    validateText(name, 'Artist\'s name');

    return Artist.findOne({ id })
        .then(existingArtist => {
            if (existingArtist) {
                throw new ExistenceError(`An artist with ID ${id} already exists`);
            } else {
                return User.findById(userId)
                    .then(user => {
                        if (!user) throw new ExistenceError(`User with id ${userId} does not exist`);
                        return Artist.create({
                            author: userId,
                            id,
                            name,
                        });
                    });
            }
        });
};
