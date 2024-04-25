const {
    errors: { ExistenceError, ContentError },
    validators: { validateEmail, validateId } } = require('com')

const { User, Post } = require('../data-project/models.js')

/**
 * updateUserEmail.js 
 * Updates a user's email profile in the database.
 * @param {string} userId - The ID of the user whose email is being updated.
 * @param {string} newUserEmail - The new email address to be set for the user.
 * @param {string} newUserEmailConfirm - The confirmation of the new email address.
 * @returns {Promise} A promise that resolves after updating the user's email profile.
 * @throws {ExistenceError} If the user ID is not found in the database or if the new emails confirmation doesn't match.
 * @throws {ExistenceError} If the new email address is the same as the old one.
 * @throws {ContentError} If the provided email addresses are not valid.
 */

module.exports = (userId, newUserEmail, newUserEmailConfirm) => {
    validateId(userId, 'user id')
    validateEmail(newUserEmail, 'Email')
    validateEmail(newUserEmailConfirm, 'Email')

    if (newUserEmail !== newUserEmailConfirm) throw new ExistenceError(`the new Emails confirmation doesn't match`)


    return Promise.all([
        User.findById(userId, 'Email').lean(),

    ]).then(([user]) => {
        if (!user) throw new ExistenceError(`The user id is not found in the DB.`)
        if (newUserEmail === user.Email) throw new ExistenceError(`New Email must be different from old one`)

        return User.updateOne(
            { _id: userId },
            {
                email: newUserEmail,
            })
    })
}

