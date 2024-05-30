const { authenticateUserPassword } = require('../logic')
const { handleErrors } = require('./helpers')
const jwt = require('jsonwebtoken')

module.exports = handleErrors((req, res) => {
    const { password } = req.body
    return authenticateUserPassword(password)
        .then(userId => {
            const payload = { sub: userId }

            const { JWT_SECRET, JWT_EXPIRATION } = process.env

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

            res.json(token)
        })
})