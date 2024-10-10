const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateUrl, validateId, validateEuroPrice, validatePlaceId, validateEventReviews, validateLineUp }
} = require('com');

const { User, Event, Artist, Place } = require('../data-project/models.js');
const addArtist = require('./addArtist'); // Import the addArtist function

module.exports = async (
    userId,
    eventPoster,
    eventName,
    eventDescription,
    eventLineup,
    eventDates,
    eventPlace,
    eventPrice
) => {
    // Validate inputs
    validateId(userId, 'user id');
    validateText(eventName, 'Event\'s title Name');
    validateText(eventDescription, 'Event\'s description');
    validateLineUp(eventLineup, 'Event\'s line up');  // Validate artist objects in the eventLineup
    validateText(eventDates, 'Event\'s line up');  // Validate artist objects in the eventLineup
    validateEuroPrice(eventPrice, 'Event\'s price in euro');
    validateEventReviews(eventReviews, 'Event\'s reviews');

    if (eventPoster) validateUrl(eventPoster, `${action} Poster Image URL`);

    if (eventPlace) validatePlaceId(eventPlace, 'Event\'s place ID');

    // Convert price to cents
    function convertPriceToCents(eventPrice) {
        if (eventPrice) {
            return parseInt(eventPrice.replace(',', ''), 10);
        }
        return 0;
    }

    const priceInCents = convertPriceToCents(eventPrice);

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ExistenceError(`User with ID ${userId} does not exist`);
    }

    // Iterate through each artist in the eventLineup and either add or retrieve them
    const artistIds = [];
    for (const artist of eventLineup) {
        let dbArtist = await Artist.findOne({ discogsId: artist.discogsId });

        if (!dbArtist) {
            // If artist does not exist, use addArtist to add them
            dbArtist = await addArtist(
                userId,                   // The user creating the artist
                artist.discogsId,          // Artist Discogs ID
                artist.name,               // Artist name
                artist.discogsUrl,         // Artist Discogs URL
                artist.image,              // Artist image URL (optional)
                artist.albums,             // Artist albums (optional)
                artist.bio,                // Artist bio (optional)
                artist.urls                // Additional artist URLs (optional)
            );
        }

        // Add the artist's ID to the artistIds array
        artistIds.push(dbArtist._id);
    }

    // Check if the place exists
    const place = await Place.findOne({ _id: placeId });
    if (!place) {
        throw new ExistenceError(`Place with ID ${placeId} does not exist`);
    }

    // Create the event
    const event = await Event.create({
        author: userId,
        poster: eventPoster,
        name: eventName,
        description: eventDescription,
        lineUp: artistIds,  // Use the artist IDs in the event
        dates: eventDates,
        place: place._id,
        price: priceInCents,
        score: "",
        likes: [],
        eventTag: [],
        eventReviews: []
    });

    return event;
};