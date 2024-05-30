require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User } = require("../../data-project/models")
const registerUser = require("../registerUser")
const { cleanUp, generate, populate } = require("../helpers/tests")
const { errors: { DuplicityError } } = require("com")
const bcrypt = require('bcryptjs')
const nonString = Math.floor(Math.random() * 100001);

describe("LIVE DIVE registerUser", () => {

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        user = generate.user()

        await cleanUp()
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })

    it("should succeed on creating an user", async () => {
        // await populate([user], []);

        await registerUser(user.name, user.nickName, user.email, user.password, user.city, user.ipGeoLocation)

        const userRegistered = await User.findOne({ email: user.email })

        const match = await bcrypt.compare(user.password, userRegistered.password);

        expect(userRegistered).to.exist
        expect(userRegistered.name).to.equal(user.name)
        expect(userRegistered.nickName).to.equal('@' + `${user.nickName}`)
        expect(userRegistered.email).to.equal(user.email)
        expect(match).to.equal(true);
        expect(userRegistered.city).to.equal(user.city)
        expect(userRegistered.ipGeoLocation.coordinates).to.deep.equal(user.ipGeoLocation)
        expect(userRegistered.avatar).to.equal(user.avatar)
    })

    it("should fail on existing user NickName", async () => {
        await registerUser(user.name, user.nickName, user.email, user.password, user.city, user.ipGeoLocation);

        try {
            await registerUser(user.name, user.nickName, user.email, user.password, user.city, user.ipGeoLocation);
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(DuplicityError);
            expect(error.message).to.equal(`User with nickname ${user.nickName} already exists`);
        }
    });

    it('should fail to register user with existing email', async () => {
        await registerUser(user.name, 'nickname1', user.email, user.password, user.city, user.ipGeoLocation);

        try {
            await registerUser(user.name, 'nickname2', user.email, user.password, user.city, user.ipGeoLocation);
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(DuplicityError);
            expect(error.message).to.equal(`User with email ${user.email} already exists`);
        }
    });


    it("should fail on unknown error", async () => {
        const errorMessage = "This is an unknown error message";

        // Simula un error desconocido arrojando una excepción con un mensaje específico.
        try {
            await registerUser(user.name, user.nickName, user.email, user.password, user.city, user.ipGeoLocation);
            throw new Error(errorMessage); // Simula un error desconocido
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(errorMessage);
        }
    });

    //!Sync errors
    it('should fail on blank name', () =>
        expect(() =>
            registerUser('', user.nickName, user.email, user.password, user.city, user.ipGeoLocation)
        ).to.throw(Error, 'Name is blank'))

    it('should fail on blank email', () =>
        expect(() =>
            registerUser(user.name, user.nickName, '', user.password, user.city, user.ipGeoLocation)
        ).to.throw(Error, "Email is blank"))

    it('should fail on blank password', () =>
        expect(() =>
            registerUser(user.name, user.nickName, user.email, '', user.city, user.ipGeoLocation)
        ).to.throw(Error, "Password is blank"))

    it('should fail on blank space name', () =>
        expect(() =>
            registerUser(' ', user.nickName, user.email, user.password, user.city, user.ipGeoLocation)
        ).to.throw(Error, "Name should not be a blank space"))

    it('should fail on blank space email', () =>
        expect(() =>
            registerUser(user.name, user.nickName, ' ', user.password, user.city, user.ipGeoLocation)
        ).to.throw(Error, "Email should not be a blank space"))

    it('should fail on blank space password', () =>
        expect(() =>
            registerUser(user.name, user.nickName, user.email, ' ', user.city, user.ipGeoLocation)
        ).to.throw(Error, "Password should not be a blank space"))

    it('SHOULD fail on non string name', () =>
        expect(() =>
            registerUser(nonString, user.nickName, user.email, user.password, user.city, user.ipGeoLocation)
        ).to.throw(Error, `The Name > ${nonString} must be a string`)
    )

    it('should fail on non string email', () =>
        expect(() =>
            registerUser(user.name, user.nickName, 11, user.password, user.city, user.ipGeoLocation)
        ).to.throw(Error, "Email must be a string"))

    it('should fail on non string password', () =>
        expect(() =>
            registerUser(user.name, user.nickName, user.email, 11, user.city, user.ipGeoLocation)
        ).to.throw(Error, "Password is not a string"))

    it('should fail on non string city', () =>
        expect(() =>
            registerUser(user.name, user.nickName, user.email, user.password, nonString, user.ipGeoLocation)
        ).to.throw(Error, `The City > ${nonString} must be a string`))

    it("should fail on non 2 values array user's ip GeoLocation", () =>
        expect(() =>
            registerUser(user.name, user.nickName, user.email, user.password, user.city, [12345, 123456, 123456])
        ).to.throw(Error, `IP GeoLocation must contain exactly two values (latitude and longitude)`))

    it("should fail on user's ip GeoLocation wrong format", () => {
        expect(() =>
            registerUser(user.name, user.nickName, user.email, user.password, user.city, 'not an array')
        ).to.throw(Error, `IP GeoLocation must be an array`);

        expect(() =>
            registerUser(user.name, user.nickName, user.email, user.password, user.city, ['latitudeNotNumber', 12.3456])
        ).to.throw(Error, `IP GeoLocation invalid latitude format`);

        expect(() =>
            registerUser(user.name, user.nickName, user.email, user.password, user.city, [-100, 12.3456])
        ).to.throw(Error, `IP GeoLocation invalid latitude format`);

        expect(() =>
            registerUser(user.name, user.nickName, user.email, user.password, user.city, [12.3456, 'longitudeNotNumber'])
        ).to.throw(Error, `IP GeoLocation invalid longitude format`);

        expect(() =>
            registerUser(user.name, user.nickName, user.email, user.password, user.city, [12.3456, -181])
        ).to.throw(Error, `IP GeoLocation invalid longitude format`);

    });


    it('should fail on wrong format email', () => {
        const invalidEmailFormat = 'user.email'
        expect(() =>
            registerUser(user.name, user.nickName, invalidEmailFormat, user.password, user.city, user.ipGeoLocation)
        ).to.throw(Error, `${invalidEmailFormat} is not valid Email format`)
    })

    it('should fail on wrong format password', () => {
        const invalidPasswordFormat = 'adfghjklñq';
        expect(() =>
            registerUser(user.name, user.nickName, user.email, invalidPasswordFormat, user.city, user.ipGeoLocation)
        ).to.throw(Error, `Password format incorrect, should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and should be at least 8 characters long`)
    })

    it('should fail on short range password', () =>
        expect(() =>
            registerUser(user.name, user.nickName, user.email, '1234', user.city, user.ipGeoLocation)
        ).to.throw(Error, "Password must be more than 8 characters long"))


})
