const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateId, validatePlaceId, validateCity }
} = require('com');

const { User, Place } = require('../data-project/models.js');


module.exports = (userId, id, placeName, city) => {
    const name = placeName;
    validateId(userId, 'User id');
    validatePlaceId(id, 'Place id');
    validateText(name, 'Place\'s name');
    validateCity(city, 'Place\'s city');

    return Place.findOne({ id })
        .then(existingPlace => {
            if (existingPlace) {
                throw new ExistenceError(`An Place with ID ${id} already exists`);
            } else {
                return User.findById(userId)
                    .then(user => {
                        if (!user) throw new ExistenceError(`User with id ${userId} does not exist`);
                        return Place.create({
                            author: userId,
                            id,
                            name,
                            city
                        });
                    });
            }
        });
};
