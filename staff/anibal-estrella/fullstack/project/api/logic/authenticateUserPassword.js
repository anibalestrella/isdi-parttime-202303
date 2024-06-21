const {
    validators: { validatePassword },
    errors: { ExistenceError, AuthError }
} = require('com')
const { User } = require('../data-project/models')
const bcrypt = require('bcryptjs')

/**
 * API/ Authenticates a user against his/her credentials
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 * 
 * @returns {Promise<string>} The user id
 * 
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */

module.exports = (email, password) => {
    validatePassword(password)

    return (async () => {
        const user = await User.findOne({ email });

        if (!user) throw new ExistenceError('User not found');

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new AuthError('wrong credentials')

        return user.id
    })()
}