const { updateUserPassword } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { userCurrentPassword, userNewPassword, userNewPasswordConfirm } = req.body
    return updateUserPassword(userId, userCurrentPassword, userNewPassword, userNewPasswordConfirm).then(() => res.status(201).send())
})