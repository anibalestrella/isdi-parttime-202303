const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateUrl, validateId, validateEuroPrice, validatePlaceId }
} = require('com');

const { User, Event, Artist, Place } = require('../data-project/models.js');

module.exports = (userId, poster, name, description, artistId, dates, placeId, price, score) => {
    validateId(userId, 'user id');
    validateUrl(poster, 'Image URL');
    validateText(name, 'Event\'s title')
    validateText(description, 'Event\'s description')
    validateText(score, 'Event\'s review score')
    validateEuroPrice(price, 'Event\'s price in euro');
    validatePlaceId(placeId, 'Event place ID')

    let priceInCents;

    if (price) {
        priceInCents = parseInt(price.replace(',', ''), 10);
    } else {
        priceInCents = 0;
    }

    // Check if the artist ID exists in the artist collection
    return Artist.findOne({ id: artistId })
        .then(artist => {
            if (!artist) {
                throw new ExistenceError(`Artist with ID ${artistId} does not exist`);
            } else {
                return Place.findOne({ id: placeId })
                    .then(place => {
                        if (!place) {
                            throw new ExistenceError(`Place with ID ${placeId} does not exist`);
                        } else {
                            return User.findById(userId)
                                .then(user => {
                                    if (!user) throw new ExistenceError(`User with id ${userId} does not exist`);
                                    return Event.create({
                                        author: userId,
                                        poster,
                                        name,
                                        description,
                                        lineUp: artist._id,
                                        dates,
                                        place: place._id,
                                        price: priceInCents,
                                        score,
                                    });
                                });
                        }
                    });
            }
        });
};
