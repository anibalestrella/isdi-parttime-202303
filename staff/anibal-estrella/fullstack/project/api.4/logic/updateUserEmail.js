const {
    errors: { ExistenceError, ContentError },
    validators: { validateEmail, validateId }
} = require('com')

const { User, Post } = require('../data-project/models.js')

/**
 * updateUserEmail.js 
 * Updates a user's email profile in the database.
 * @param {string} userId - The ID of the user whose email is being updated.
 * @param {string} userNewEmail - The new email address to be set for the user.
 * @param {string} userNewEmailConfirm - The confirmation of the new email address.
 * @returns {Promise} A promise that resolves after updating the user's email profile.
 * @throws {ExistenceError} If the user ID is not found in the database or if the new emails confirmation doesn't match.
 * @throws {ExistenceError} If the new email address is the same as the old one.
 * @throws {ContentError} If the provided email addresses are not valid.
 */

module.exports = async (userId, userNewEmail, userNewEmailConfirm) => {
    validateId(userId, 'user id')
    validateEmail(userNewEmail, 'Email')
    validateEmail(userNewEmailConfirm, 'Email confirmation')


    try {
        const user = await User.findById(userId)

        if (userNewEmail !== userNewEmailConfirm) throw new ContentError(`Confirmation Email doesn't match. \nPlease try Again.`)

        if (!user) throw new ExistenceError(`User id is not found in the DB.`)

        if (userNewEmail === user.Email) throw new ExistenceError(`New Email must be different from old one.`)

        await User.updateOne(
            { _id: userId },
            {
                email: userNewEmail,
            })
    } catch (error) {
        throw error
    }
}

