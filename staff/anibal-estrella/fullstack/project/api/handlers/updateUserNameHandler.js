const { updateUserName } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { name } = req.body
    return updateUserName(userId, name).then(() => res.status(201).send())
})