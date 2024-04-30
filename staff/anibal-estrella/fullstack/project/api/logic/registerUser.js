require("dotenv").config()
const { validators: { validateName, validateEmail, validatePassword, validateCity, validateNickName, validateIpGeoLocation },
    errors: { DuplicityError, UnknownError } } = require('com')

const { User } = require('../data-project/models.js')
const bcrypt = require('bcryptjs')

/**
 * Api/registerUser:
 * Register user in the database
 * @param {string} name User's name
 * @param {string} nickName User's nickname
 * @param {string} email User's email
 * @param {string} password User's password
 * @param {string} city User's city
 * @param {number[]} ipGeoLocation User's city geo data [lon, lat]
 * @returns {Promise} Promise that resolves after user registration
 */

module.exports = function registerUser(name, nickName, email, password, city, ipGeoLocation) {

    validateName(name)
    validateNickName(nickName)
    validateEmail(email)
    validatePassword(password)
    validateCity(city)

    validateIpGeoLocation(ipGeoLocation)

    const [latitude, longitude] = ipGeoLocation;
    return (async () => {

        try {
            const hash = await bcrypt.hash(password, 10);
            const defaultAvatar = "./assets/avatar-default.svg"


            const newUser = await User.create({
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

            // debugger
            // console.log("New user:", newUser);

        } catch (error) {
            if (error.message.includes('E11000')) {
                if (error.keyPattern && error.keyPattern.email) {
                    throw new DuplicityError(`User with email ${email} already exists`);
                } else if (error.keyPattern && error.keyPattern.nickName) {
                    throw new DuplicityError(`User with nickname ${nickName} already exists`);
                } else {
                    throw new UnknownError("Unknown duplication error");
                }
            }
            throw error;
        }

    })()
};
