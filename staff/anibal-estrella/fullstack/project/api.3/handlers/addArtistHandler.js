const { addArtist } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

/**
 * 
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { artistId, name } = req.body

    return addArtist(userId, artistId, name).then(() => res.status(201).send())
})


