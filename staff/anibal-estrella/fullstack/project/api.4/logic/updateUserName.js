const {
    errors: { ExistenceError, ContentError },
    validators: { validateName, validateId }
} = require('com')

const { User } = require('../data-project/models')
const bcrypt = require('bcryptjs')

/**
 * UPDATE USER NAME
 * updateUserName.js
 * 
 * Updates the name of a user in the database.
 * 
 * @param {string} userId - The ID of the user to update.
 * @param {string} userName - The new name for the user.
 * @returns {Promise<void>} - A Promise that resolves after the user's name is updated.
 * @throws {ExistenceError} - If the user ID is not found in the database.
 * @throws {ExistenceError} - If the new name is the same as the old one.
 * @throws {ContentError} - If the new name fails validation.
 */

module.exports = async (userId, userName) => {
    // const userNewName = userName.toLowerCase()
    const userNewName = userName

    validateId(userId, 'user id')
    validateName(userNewName, 'name')

    try {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError(`The User id is not found in the DB`)

        if (userNewName === user.name) throw new ExistenceError('New name must be different from old one')

        await User.updateOne({ _id: userId }, { name: userNewName })
    } catch (error) {
        throw error
    }
}


