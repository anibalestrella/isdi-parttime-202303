const { createEventReview } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

/**
 * 
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { eventId, author, text, lineUp, dates, place, price, score, image, audio, video } = req.body

    return createEventReview(userId, eventId, text, lineUp, dates, place, score, image, audio, video, price).then(() => res.status(201).send())
})


