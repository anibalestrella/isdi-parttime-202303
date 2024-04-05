require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('../registerUser')
const { cleanUp, populate, generate } = require('../helpers/tests')
const { MongoClient } = require('mongodb')
const context = require('../context')
const { user } = require('../helpers/tests/generate')
describe('registerUser test 2', () => {
    let client

    before(() => {
        client = new MongoClient(process.env.MONGODB_URL)

        return client.connect()
            .then(connection => {
                const db = connection.db()

                context.users = db.collection('users')
                context.events = db.collection('events')
                context.eventreviews = db.collection('eventreviews')
                context.places = db.collection('places')
            })
    })
    // let user;

    // beforeEach(() => {
    //     user = generate.user(); 
    //     return cleanUp();
    // });

    it('succeeds on new user 2', async () => {

        try {

            const user = {
                name: 'username',
                nickName: 'nickName',
                email: `email-${Math.random().toString(36).substring(7)}@mail.com`,
                password: 'user.password',
                city: 'usercity',
                ipGeoLocation: [Math.random(), Math.random()]
            };
            console.log(user);

            await registerUser(user.name, user.nickName, user.email, user.password, user.city, user.ipGeoLocation)

            console.log('INITIATE USER:', JSON.stringify(user));

            const user2 = await context.users.findOne({ email: user.email });

            expect(user2).to.exist
            expect(user2.name).to.equal(user.nickName)
            expect(user2.email).to.equal(user.email)
            expect(user2.password).to.equal(user.password)
            expect(user2.nickName).to.equal(user.nickName)
            expect(user2.ipGeoLocation).to.equal(user.ipGeoLocation)
            expect(user2.city).to.equal(user.city)
        } catch (error) {
            `Error occurred: ${error}`

            throw error;
        }
    });



    after(() => client.close())
});
