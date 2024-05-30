const { updateUserName } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { userNewName } = req.body

    return updateUserName(userId, userNewName)
        .then(() => res.status(204).send())
})