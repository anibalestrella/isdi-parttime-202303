const { updateUserAvatar } = require('../logic')
const { extractToken } = require('../helpers')

const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const token = extractToken(req)
        const payload = jwt.verify(token, process.env.SECRET)
        const { sub: userId } = payload

        const { avatar } = req.body

        debugger
        updateUserAvatar(userId, avatar, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }
        })

        res.status(204).send()

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}