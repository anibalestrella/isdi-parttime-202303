require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('../registerUser')
const { cleanUp, populate, generate } = require('../helpers/tests')
const { MongoClient } = require('mongodb')
const context = require('../context')

describe('registerUser test', () => {
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

    let user

    beforeEach(() => {
        user = generate.user()

        return cleanUp()
    })

    it('succeeds on new user', () => {
        console.log('INITIATE USER:', JSON.stringify(user));

        registerUser(user.name, user.nickName, user.email, user.password, user.city, user.ipGeoLocation)
            .then(() => context.users.findOne({ email: user.email }))
            .then(user2 => {
                expect(user2).to.exist
                expect(user2.name).to.equal(user.nickName)
                expect(user2.email).to.equal(user.email)
                expect(user2.password).to.equal(user.password)
                expect(user2.nickName).to.equal(user.nickName)
                expect(user2.ipGeoLocation).to.equal(user.ipGeoLocation)
                expect(user2.city).to.equal(user.city)
            })
            .catch(error => {
                console.error('Error occurred:', error);
                throw error;
            })
    }
    )

    it('succeeds on existing user', () => {
        const user2 = generate.user()
        const users = [user2]

        return populate(users, [], [], [],)
            .then(() => registerUser(user.name, user.nickName, user.email, user.password, user.city, user.ipGeoLocation))
            .then(() => context.users.findOne({ email: user.email }))
            .then(user2 => {
                expect(user2).to.exist
                expect(user2.name).to.equal(user.name)
                expect(user2.name).to.equal(user.nickName)
                expect(user2.email).to.equal(user.email)
                expect(user2.password).to.equal(user.password)
                expect(user2.avatar).to.be.null
                expect(user2.favs).to.have.lengthOf(0)
            })
    })

    // it('fails on existing user', () => {
    //     const users = [user]

    //     return populate(users, [])
    //         .then(() => registerUser(user.name, user.nickName, user.email, user.password, user.city, user.ipGeoLocation))
    //         .catch(error => {
    //             expect(error).to.be.instanceOf(Error)
    //             expect(error.message).to.equal(`user with email ${user.email} already exists`)
    //         })
    // })

    // it('fails on blank name', () =>
    //     expect(() => registerUser('', user.nickName, user.email, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'name is blank')
    // )

    // it('fails on blank email', () =>
    //     expect(() => registerUser(user.name, 'nickName', '', user.password, user.city, user.ipGeoLocation, () => { })).to.throw(Error, 'email is blank')
    // )

    // it('fails on non-string name', () => {
    //     expect(() => registerUser(undefined, user.email, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'name must be a string')
    //     expect(() => registerUser(1, user.email, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'name must be a string')
    //     expect(() => registerUser(true, user.email, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'name must be a string')
    //     expect(() => registerUser({}, user.email, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'name must be a string')
    //     expect(() => registerUser([], user.email, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'name must be a string')
    // })

    // it('fails on non-string email', () => {
    //     expect(() => registerUser(user.name, user.nickname, user.email, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'must be a string')
    //     expect(() => registerUser(user.name, user.nickname, 1, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'must be a string')
    //     expect(() => registerUser(user.name, user.nickname, true, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'must be a string')
    //     expect(() => registerUser(user.name, user.nickname, {}, user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'must be a string')
    //     expect(() => registerUser(user.name, user.nickname, [], user.password, user.ipGeoLocation, () => { })).to.throw(Error, 'must be a string')
    // })
    // TODO add more unhappies
    after(() => cleanUp().then(() => client.close()))
})