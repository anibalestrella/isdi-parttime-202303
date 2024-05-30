const {
    errors: { ExistenceError, ContentError },
    validators: { validateUrl, validateId } } = require('com')

const { User } = require('../data-project/models.js')

/**
 * 
 * @param {*} userId the user's ID
 * @param {*} avatar the avatar's image url
 * @returns 
 */

module.exports = (userId, avatar) => {

    validateId(userId, 'user id')
    validateUrl(avatar, 'Image URL')

    return Promise.all([
        User.findById(userId, 'avatar').lean(),

    ])
        .then(([user]) => {
            if (!user) throw new ExistenceError(`User id not found in the DB`)

            return User.updateOne(
                { _id: userId },
                {
                    avatar: avatar,
                })
        })
        .then(() => { })
}

