const {
    errors: { ExistenceError, ContentError },
    validators: { validateId }
} = require('com');

const { User } = require('../data-project/models');

/**
 * API/ updateUserAvatar.js
 * Updates the user's avatar.
 * 
 * @param {string} userId The user's ID
 * @param {string} imageUrl The path to the image image file
 * @returns {Promise<void>}
 */

module.exports = async (userId, imageUrl) => {
    try {
        validateId(userId, 'user id');

        const user = await User.findById(userId, 'avatar').lean();
        if (!user) throw new ExistenceError(`User with the id ${userId} not found`);

        await User.updateOne(
            { _id: userId },
            { avatar: imageUrl }
        );
    } catch (error) {
        throw error;
    }
};
