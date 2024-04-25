const { updateUserName } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { newName } = req.body

    return updateUserName(userId, newName).then(() => res.status(201).send())
})