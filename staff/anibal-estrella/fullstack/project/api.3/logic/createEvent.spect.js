require('dotenv').config();

const { expect } = require('chai');
const createEvent = require('./createEvent');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { MongoClient } = require('mongodb');
const context = require('./context');

describe('createEvent', () => {
    let client;

    before(() => {
        client = new MongoClient(process.env.MONGODB_URL);

        return client.connect()
            .then(connection => {
                const db = connection.db();

                context.users = db.collection('users');
                context.events = db.collection('events');
            });
    });

    let user;

    beforeEach(() => {
        user = generate.user();

        return cleanUp();
    });

    it('should create an event', async () => {
        const eventDetails = generate.event();

        await populate([user], []);

        await createEvent(
            user._id.toString(),
            eventDetails.poster,
            eventDetails.name,
            eventDetails.description,
            eventDetails.lineUp,
            eventDetails.dates,
            eventDetails.place,
            eventDetails.price,
            eventDetails.eventReviews
        );

        const createdEvent = await context.events.findOne({ name: eventDetails.name });

        expect(createdEvent).to.exist;
        expect(createdEvent.author).to.equal(user._id);
        expect(createdEvent.poster).to.equal(eventDetails.poster);
        expect(createdEvent.name).to.equal(eventDetails.name);
        expect(createdEvent.description).to.equal(eventDetails.description);
        expect(createdEvent.lineUp).to.deep.equal(eventDetails.lineUp);
        expect(createdEvent.dates).to.deep.equal(eventDetails.dates);
        expect(createdEvent.place).to.equal(eventDetails.place);
        expect(createdEvent.price).to.equal(eventDetails.priceInCents);
        expect(createdEvent.eventReviews).to.deep.equal(eventDetails.eventReviews);
    });

    // Add more test cases for different scenarios

    after(() => cleanUp().then(() => client.close()));
});
