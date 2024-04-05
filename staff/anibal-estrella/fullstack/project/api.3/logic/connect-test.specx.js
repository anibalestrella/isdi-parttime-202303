require('dotenv').config()
const registerUser = require('./registerUser')


const { expect } = require('chai')
const { MongoClient } = require('mongodb')

describe('MongoDB Connection', () => {
    let client

    before(async () => {
        client = new MongoClient(process.env.MONGODB_URL)

        try {
            await client.connect()
            console.log('MongoDB connected successfully!')
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
        }
    })

    const name = 'anibal estrella'
    const nickName = 'zensir'
    const email = 'zensir@gmail.com'
    const password = 'user.password'
    const city = 'barcelona'
    const ipGeoLocation = [1.212345, 1.522345]
    it('should connect to the MongoDB database', () => {
        expect(client.topology.isConnected()).to.be.true
        it('succeeds on new user 2', () =>
            registerUser(name, nickName, email, password, city, ipGeoLocation)
                .then(() => context.users.findOne({ email: 'zensir@gmail.com' }))
                .then(user2 => {
                    expect(user2).to.exist
                    // expect(user2._id.toString()).to.equal(user._id.toString())
                    expect(user2.name).to.equal(user.name)
                    expect(user2.email).to.equal(user.email)
                    expect(user2.password).to.equal(user.password)
                    expect(user2.nickName).to.equal(user.nickName)
                    expect(user2.ipGeoLocation).to.equal(user.ipGeoLocation)
                    expect(user2.city).to.equal(user.city)
                })
        )
    })

    it('succeeds on new user 2', () =>
        registerUser(name, nickName, email, password, city, ipGeoLocation)
            .then(() => context.users.findOne({ email: 'zensir@gmail.com' }))
            .then(user2 => {
                expect(user2).to.exist
                // expect(user2._id.toString()).to.equal(user._id.toString())
                expect(user2.name).to.equal(user.name)
                expect(user2.email).to.equal(user.email)
                expect(user2.password).to.equal(user.password)
                expect(user2.nickName).to.equal(user.nickName)
                expect(user2.ipGeoLocation).to.equal(user.ipGeoLocation)
                expect(user2.city).to.equal(user.city)
            })
    )

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


