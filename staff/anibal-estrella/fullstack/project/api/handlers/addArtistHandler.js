const { addArtist } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

/**
 * Handles adding a new artist with Discogs data.
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    // Extract all required artist fields from the request body
    const { discogsId, discogsUrl, name, image, albums, bio, urls } = req.body

    // Validate that all required fields are present
    if (!discogsId || !discogsUrl || !name) {
        return res.status(400).json({ message: 'Missing required fields: discogsId, discogsUrl, or name' })
    }

    // Call the addArtist logic with the provided data
    return addArtist(
        userId,        // The user creating the artist
        discogsId,     // The Discogs ID of the artist
        name,          // The artist's name
        discogsUrl,    // The Discogs URL of the artist
        image,         // Optional: artist image URL
        albums,        // Optional: array of album names
        bio,           // Optional: artist biography
        urls           // Optional: array of additional URLs related to the artist
    )
        .then(() => res.status(201).send())  // Send success response
        .catch(error => res.status(500).json({ message: error.message }))  // Handle errors
})