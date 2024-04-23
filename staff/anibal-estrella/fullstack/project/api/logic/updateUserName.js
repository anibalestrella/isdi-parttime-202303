const {
    errors: { ExistenceError, ContentError },
    validators: { validateName, validateId }
} = require('com')

const { User } = require('../data-project/models')
const bcrypt = require('bcryptjs')

/** 
 * UPDATE USER NAME
 *
 * @param {*} userId
 * @param {*} userNewName
 * @returns
 */

module.exports = async (userId, userName) => {
    const userNewName = userName.toLowerCase()

    validateId(userId, 'user id')
    validateName(userNewName, 'name')

    try {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError(`The User id is not found in the DB`)

        // You need to implement proper password validation here

        if (userNewName === user.name) throw new ExistenceError('New name must be different from old one')

        await User.updateOne({ _id: userId }, { name: userNewName })
    } catch (error) {
        throw error
    }
}


