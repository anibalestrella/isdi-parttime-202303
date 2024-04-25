const { validators: { validateName, validateEmail, validatePassword, validateCity, validateNickName, validateIpGeoLocation },
    errors: { DuplicityError, UnknownError } } = require('com')

const { User } = require('../data-project/models.js')
// const context = require('./context')
const bcrypt = require('bcryptjs')

/**
 * Api/registerUser:
 * Register user in the database
 * @param {string} name User's name
 * @param {string} nickName User's nickname
 * @param {string} email User's email
 * @param {string} password User's password
 * @param {string} city User's city
 * @param {string[]} ipGeoLocationCoordinates User's city geo data [lon, lat]
 * @returns {Promise} Promise that resolves after user registration
 */

module.exports = (name, nickName, email, password, city, ipGeoLocationCoordinates) => {
    validateName(name)
    validateNickName(nickName)
    validateEmail(email)
    validatePassword(password)
    validateCity(city)
    validateIpGeoLocation(ipGeoLocationCoordinates)


    return (async () => {

        const [latitude, longitude] = ipGeoLocationCoordinates;

        try {
            const hash = await bcrypt.hash(password, 10);

            await User.create({
                name,
                nickName: "@" + nickName,
                email,
                password: hash,
                city,
                ipGeoLocation: {
                    type: "Point",
                    coordinates: [latitude, longitude]
                },
                avatar: "./assets/avatar-default.svg",
                favArtists: []
            });

            // Resolve the promise after successful registration
            return Promise.resolve("User registration successful");
        } catch (error) {
            if (error.message.includes('E11000')) {
                if (error.keyPattern && error.keyPattern.nickName) {
                    throw new DuplicityError(`User with nickname ${nickName} already exists`);
                } else if (error.keyPattern && error.keyPattern.email) {
                    throw new DuplicityError(`User with email ${email} already exists`);
                } else {
                    throw new UnknownError("Unknown duplication error");
                }
            }
            throw error;
        }

    });
};
