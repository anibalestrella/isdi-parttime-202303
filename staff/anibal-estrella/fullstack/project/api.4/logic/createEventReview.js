const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateUrl, validateId }
} = require('com');

const { User, Event, EventReview } = require('../data-project/models.js');

module.exports = (eventId, userId, title, text, lineUp, dates, placeId, score, image) => {
    validateId(userId, 'user id');
    validateUrl(image, 'Image URL');
    validateText(text, 'Event\'s text');

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} does not exist`);
            return EventReview.create({
                author: userId,
                event: eventId,
                title,
                text,
                lineUp: lineUp,
                dates,
                place: placeId,
                score,
                image,
            });
        })
        .then(() => { });
}