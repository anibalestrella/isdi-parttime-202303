const { createEvent } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

/**
 * 
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const {
        eventPoster,
        eventName,
        eventDescription,
        eventLineup,
        eventDates,
        eventPlace,
        eventPrice } = req.body

    return createEvent(

        userId,
        eventPoster,
        eventName,
        eventDescription,
        eventLineup,
        eventDates,
        eventPlace,
        eventPrice).then(() => res.status(201).send())
})


