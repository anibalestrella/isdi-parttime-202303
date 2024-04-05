require('dotenv').config()
const registerUser = require('./registerUser')


const { expect } = require('chai')
const { MongoClient } = require('mongodb')
describe('registerUser', () => {
    let client

    before(async () => {
        client = new MongoClient(process.env.MONGODB_URL)

        try {
            await client.connect()
            const db = client.db()

            context.users = db.collection('users')
            context.events = db.collection('events')
            context.eventreviews = db.collection('eventreviews')
            context.places = db.collection('places')
            console.log('connected!!!');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
        }
    })

    let user

    beforeEach(async () => {
        user = generate.user()
        await cleanUp()
    })

    it('succeeds on new user', async () => {
        try {
            await registerUser(user.name, user.nickName, user.email, user.password, user.city, user.ipGeoLocation)
            const user2 = await context.users.findOne({ email: user.email })
            expect(user2).to.exist
            expect(user2.name).to.equal(user.name)
            expect(user2.email).to.equal(user.email)
            expect(user2.password).to.equal(user.password)
            expect(user2.nickName).to.equal(user.nickName)
            expect(user2.ipGeoLocation).to.equal(user.ipGeoLocation)
            expect(user2.city).to.equal(user.city)
        } catch (error) {
            console.error('Error in test:', error)
            throw error
        }
    })

    // Enable other test cases here

    afterEach(async () => {
        await cleanUp()
    })

    after(async () => {
        if (client) {
            try {
                await client.close()
                console.log('MongoDB connection closed.')
            } catch (error) {
                console.error('Error closing MongoDB connection:', error)
            }
        }
    })
})
