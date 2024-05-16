const {
    errors: { ExistenceError, ContentError },
    validators: { validateUrl, validateId } } = require('com')

const { User } = require('../data-project/models.js')

/**
 * 
 * @param {*} userId the user's ID
 * @param {*} avatarUrl the avatarUrl's image url
 * @returns 
 */

module.exports = function updateUserAvatarUrl(userId, avatarUrl) {
    validateId(userId, 'user id')
    validateUrl(avatarUrl, 'Image URL')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('User not found')

        await user.updateOne({ avatar: avatarUrl })
    })()

}

