const { uploadMedia } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { filePath, fileName } = req.body
    return uploadMedia(userId, filePath, fileName).then(() => res.status(201).send())
})