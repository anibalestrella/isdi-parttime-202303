const {
    errors: { ExistenceError, ContentError },
    validators: { validateName, validateId } } = require('com')

const { User } = require('../data-project/models.js')

/**
 * 
 * @param {*} userId 
 * @param {*} newName 
 * @returns 
 */

module.exports = (userId, newName, newNameConfirm) => {

    validateId(userId, 'user id')
    validateName(newName, 'Name')

    return Promise.all([
        User.findById(userId, 'Name').lean(),

    ]).then(([user]) => {
        if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
        if (newName === user.Name) throw new ExistenceError(`new Name must be different from old one`)

        return User.updateOne(
            { _id: userId },
            {
                name: newName,
            })
    })
        .then(() => { })
}

