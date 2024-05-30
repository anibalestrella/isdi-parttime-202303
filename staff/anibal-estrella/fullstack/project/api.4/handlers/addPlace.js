const { addPlace } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

/**
 * 
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { placeId, name } = req.body

    return addPlace(userId, placeId, name).then(() => res.status(201).send())
})


