require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User } = require("../../data-project/models")
const registerUser = require("../registerUser")
const { cleanUp, generate } = require("../helpers/tests")
const { errors: { DuplicityError } } = require("com")
const bcrypt = require('bcryptjs')

describe("LIVE DIVE registerUser", () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        user = generate.user()
        // console.log(user);

        await cleanUp()
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })

    it("should succeed on creating an user", async () => {
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
        // Prepare known existing email address
        const existingEmail = 'existing@example.com';

        // Attempt to register a user with the existing email
        try {
            // Call the registerUser function with the existing email
            await registerUser('john doe', 'john.doe', existingEmail, 'password123', 'New York', [40.7128, -74.0060]);

            // If registration succeeds, fail the test
            throw new Error('Expected registration to fail but succeeded');
        } catch (error) {
            // Assert that the error is an instance of DuplicityError
            expect(error).to.be.an.instanceOf(DuplicityError);
            // Assert that the error message indicates the email duplication
            expect(error.message).to.equal(`User with email ${existingEmail} already exists`);
        }
    });


    it("should fail on unknown error", async () => {
        const errorMessage = "This is an unknown error message";

        // Simula un error desconocido arrojando una excepción con un mensaje específico.
        try {
            await registerUser(user.name, user.email, user.password);
            throw new Error(errorMessage); // Simula un error desconocido
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(errorMessage);
        }
    });

    //!Sync errors
    it('should fail on empty name', () =>
        expect(() =>
            registerUser('', user.email, user.password)
        ).to.throw(Error, 'Username is empty'))

    it('should fail on empty email', () =>
        expect(() =>
            registerUser(user.name, "", user.password)
        ).to.throw(Error, "Email is empty"))

    it('should fail on empty password', () =>
        expect(() =>
            registerUser(user.name, user.email, "")
        ).to.throw(Error, "Password is empty"))

    it('should fail on blank space name', () =>
        expect(() =>
            registerUser(' ', user.email, user.password)
        ).to.throw(Error, "Username cant be a blankSpace"))

    it('should fail on blank space email', () =>
        expect(() =>
            registerUser(user.name, " ", user.password)
        ).to.throw(Error, "Email cant be a blankSpace"))

    it('should fail on blank space password', () =>
        expect(() =>
            registerUser(user.name, user.email, " ")
        ).to.throw(Error, "Password cant be a blankSpace"))

    it('should fail on non string name', () =>
        expect(() =>
            registerUser(22, user.email, user.password)
        ).to.throw(Error, "Username is not a string"))

    it('should fail on non string email', () =>
        expect(() =>
            registerUser(user.name, 22, user.password)
        ).to.throw(Error, "Email is not a string"))

    it('should fail on non string password', () =>
        expect(() =>
            registerUser(user.name, user.email, 22)
        ).to.throw(Error, "Password is not a string"))

    it('should fail on wrong format email', () =>
        expect(() =>
            registerUser(user.name, "minameisdrluke", user.password)
        ).to.throw(Error, 'Invalid email format'))

    it('should fail on wrong format password', () =>
        expect(() =>
            registerUser(user.name, user.email, "minameisdrluke")
        ).to.throw(Error, `password format incorrect`))

    it('should fail on short range password', () =>
        expect(() =>
            registerUser(user.name, user.nickName, user.email, '1234', user.city, user.ipGeoLocationCoordinates)
        ).to.throw(Error, "Password is shorter than 4 characters"))
})
