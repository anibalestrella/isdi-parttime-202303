const { updateUserProfile } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { newEmail, newEmailConfirm } = req.body

    return updateUserProfile(userId, newEmail, newEmailConfirm).then(() => res.status(201).send())
})