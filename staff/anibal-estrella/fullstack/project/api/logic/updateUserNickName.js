const {
    errors: { ExistenceError, ContentError },
    validators: { validateNickName, validateId }
} = require('com')

const { User } = require('../data-project/models')
const bcrypt = require('bcryptjs')

/** 
 * API/ updateUserNickName.js
 * Updates the user's nickname.
 *
 * @param {string} userId - The user's ID.
 * @param {string} userNewNickName - The user's desired new nickname.
 * @throws {Error} - Throws an error if validation fails, user doesn't exist, or new nickname is the same as the old one.
 */

module.exports = async (userId, userNewNickName) => {
    validateId(userId, 'user id')
    validateNickName(userNewNickName, 'name')

    try {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`User id is not found in the DB.`)

        if (userNewNickName === user.nickName) throw new ExistenceError('New nick name must be different from old one')

        await User.updateOne({ _id: userId }, { nickName: userNewNickName })
    } catch (error) {
        throw error
    }
}

