const { updateUserAvatar } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { imageUrl } = req.body

    return updateUserAvatar(userId, imageUrl).then(() => res.status(201).send())
})