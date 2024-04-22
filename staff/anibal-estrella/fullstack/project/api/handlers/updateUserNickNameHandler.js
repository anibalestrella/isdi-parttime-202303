const { updateUserNickName } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { nickName } = req.body
    return updateUserNickName(userId, nickName).then(() => res.status(201).send())
})