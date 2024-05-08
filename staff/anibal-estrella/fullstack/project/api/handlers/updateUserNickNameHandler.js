const { updateUserNickName } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { userNewNickName } = req.body

    return updateUserNickName(userId, userNewNickName)
        .then(() => res.status(204).send())
})