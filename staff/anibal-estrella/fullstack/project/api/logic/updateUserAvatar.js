const {
    errors: { ExistenceError, ContentError },
    validators: { validateId }
} = require('com');

const { User } = require('../data-project/models');
const uploadMedia = require('./uploadMedia');

/**
 * Updates the user's avatar.
 * 
 * @param {string} userId The user's ID
 * @param {string} imageUrl The path to the image image file
 * @returns {Promise<void>}
 */
module.exports = async (userId, imageUrl) => {
    try {
        // Validate the user ID
        validateId(userId, 'user id');

        // Upload the media and get the URL
        // const fileUrl = await uploadMedia(image, 'avatar image');

        // Find the user
        const user = await User.findById(userId, 'avatar').lean();
        if (!user) throw new ExistenceError(`User with the id ${userId} not found`);

        // Update the user's avatar
        await User.updateOne(
            { _id: userId },
            { avatar: imageUrl }
        );
    } catch (error) {
        // Handle any errors that occur during the process
        throw error;
    }
};
