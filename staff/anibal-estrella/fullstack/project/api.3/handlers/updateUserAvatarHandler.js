const { updateUserAvatar } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { avatar } = req.body

    return updateUserAvatar(userId, avatar).then(() => res.status(201).send())
})