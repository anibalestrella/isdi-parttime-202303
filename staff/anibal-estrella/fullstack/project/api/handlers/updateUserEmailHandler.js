const { updateUserEmail } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { userNewEmail, userNewEmailConfirm } = req.body

    return updateUserEmail(userId, userNewEmail, userNewEmailConfirm)
        .then(() => res.status(204).send())
})