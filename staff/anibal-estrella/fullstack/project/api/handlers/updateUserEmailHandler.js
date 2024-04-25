const { updateUserEmail } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { email, emailConfirm } = req.body

    return updateUserEmail(userId, email, emailConfirm).then(() => res.status(201).send())
})