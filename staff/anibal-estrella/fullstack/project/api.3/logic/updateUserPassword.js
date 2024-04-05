const {
    errors: { ExistenceError, ContentError },
    validators: { validatePassword, validateId } } = require('com')

const { User, Post } = require('../data/models.js')

/**
 * 
 * @param {*} userId 
 * @param {*} password 
 * @param {*} newPassword 
 * @param {*} newPasswordConfirm 
 * @returns 
 */

module.exports = (userId, password, newPassword, newPasswordConfirm) => {

    validateId(userId, 'user id')
    validatePassword(password, 'password')
    validatePassword(newPassword, 'password')
    validatePassword(newPasswordConfirm, 'password')

    if (newPassword !== newPasswordConfirm) throw new ExistenceError(`the new passwords confirmation doesn't match`)


    return Promise.all([
        User.findById(userId, 'password').lean(),

    ]).then(([user]) => {
        if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
        if (password !== user.password) throw new ExistenceError(`password missmatch with db`)
        if (newPassword === user.password) throw new ExistenceError(`new password must be different from old one`)

        return User.updateOne(
            { _id: userId },
            {
                password: newPassword,
            })
    })
        .then(() => { })
}

