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

module.exports = function updateUserAvatar(userId, avatar) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'Image URL')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('User not found')

        await user.updateOne({ avatar: avatar })
    })()

    // return Promise.all([
    //     User.findById(userId, 'avatar').lean(),

    // ])
    //     .then(([user]) => {
    //         if (!user) throw new ExistenceError(`User id not found in the DB`)

    //         return User.updateOne(
    //             { _id: userId },
    //             {
    //                 avatar: avatar,
    //             })
    //     })
    //     .then(() => { })
}

