const { createEvent } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

/**
 * 
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { poster, title, description, lineUp, dates, place, price, eventReviews, score, likes } = req.body

    return createEvent(
        userId,
        poster,
        title,
        description,
        lineUp,
        dates,
        place,
        price,
        eventReviews,
        score,
        likes).then(() => res.status(201).send())
})


