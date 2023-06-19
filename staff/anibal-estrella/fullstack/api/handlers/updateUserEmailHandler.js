const { updateUserEmail } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { email, newEmail, newEmailConfirm } = req.body


        updateUserEmail(userId, email, newEmail, newEmailConfirm, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }
            res.status(204).send()
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}