const { updateUserPassword } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { userNewPassword, userNewPasswordConfirm } = req.body
    return updateUserPassword(userId, userNewPassword, userNewPasswordConfirm).then(() => res.status(201).send())
})