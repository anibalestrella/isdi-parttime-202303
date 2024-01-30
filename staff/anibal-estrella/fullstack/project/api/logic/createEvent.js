const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateUrl, validateId, validateEuroPrice }
} = require('com');

const { User, Event } = require('../data-project/models.js');

module.exports = (author, poster, name, description, lineUp, dates, place, price, eventReviews) => {
    validateId(userId, 'user id');
    validateUrl(image, 'Image URL');
    validateText(text, 'Event\'s text');
    validateEuroPrice(price, 'Event\'s price in euro');

    let priceInCents;

    if (price) {
        priceInCents = parseInt(price.replace(',', ''), 10);
    } else {
        priceInCents = 0;  // Default to 0 if price is not provided
    }

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} does not exist`);
            return Event.create({
                author: userId,
                poster, name, description, lineUp, dates, place, eventReviews,
                price: priceInCents
            });
        })
        .then(() => { });
}