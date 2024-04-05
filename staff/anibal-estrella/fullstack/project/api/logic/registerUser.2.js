const { validators: { validateName, validateEmail, validatePassword, validateCity, validateNickName, validateIpGeoLocation },
    errors: { DuplicityError, UnknownError } } = require('com')

const { User } = require('../data-project/models.js')
const bcrypt = require('bcryptjs')

/**
 * Api/registerUser:
 * Register user against in db
 * @param {string} name user's name
 * @param {string} nickName user's nick Name
 * @param {string} email user's email
 * @param {string} password user's password
 * @param {string} city user's city
 * @param {string} ipGeoLocationCoordinates user's city geo data lon lat
 * @returns {Promise}
 */

module.exports = async (name, nickName, email, password, city, ipGeoLocationCoordinates) => {
    // Validate input data
    validateName(name)
    validateNickName(nickName)
    validateEmail(email)
    validatePassword(password)
    validateCity(city)
    validateIpGeoLocation(ipGeoLocationCoordinates)

    const [latitude, longitude] = ipGeoLocationCoordinates;

    try {
        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create the user in the database
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

        // Return a resolved promise to indicate successful registration
        return Promise.resolve("User registration successful");
    } catch (error) {
        // Handle duplicate key errors
        if (error.message.includes('E11000')) {
            if (error.keyPattern && error.keyPattern.nickName) {
                throw new DuplicityError(`user with nickname ${nickName} already exists`);
            } else if (error.keyPattern && error.keyPattern.email) {
                throw new DuplicityError(`user with email ${email} already exists`);
            } else {
                throw new UnknownError("Unknown duplication error");
            }
        }

        // If it's not a duplicate key error, throw the original error
        throw error;
    }
};



// const { validators: { validateName, validateEmail, validatePassword, validateCity, validateNickName, validateIpGeoLocation },
//     errors: { DuplicityError, UnknownError } } = require('com')

// const { User } = require('../data-project/models.js')
// // const context = require('./context')
// const bcrypt = require('bcryptjs')

// /**
//  * Api/registerUser:
//  * Ragister user against in db
//  * @param {string} name user's name
//  * @param {string} nickName user's nick Name
//  * @param {string} email user's email
//  * @param {string} password user's password
//  * @param {string} city user's city
//  * @param {string} ipGeoLocationCoordinates user's city geo data lon lat
//  * @returns {Promise}
//  */

// module.exports = (name, nickName, email, password, city, ipGeoLocationCoordinates) => {
//     validateName(name)
//     validateNickName(nickName)
//     validateEmail(email)
//     validatePassword(password)
//     validateCity(city)
//     validateIpGeoLocation(ipGeoLocationCoordinates)

//     const [latitude, longitude] = ipGeoLocationCoordinates;

//     return (async () => {
//         try {
//             const hash = await bcrypt.hash(password, 10)

//             await User.create({
//                 name,
//                 nickName: "@" + nickName,
//                 email,
//                 password: hash,
//                 city,
//                 ipGeoLocation: {
//                     type: "Point",
//                     coordinates: [latitude, longitude]
//                 }, avatar: "./assets/avatar-default.svg",
//                 favArtists: []
//             })

//         } catch (error) {
//             if (error.message.includes('E11000')) {
//                 if (error.keyPattern && error.keyPattern.nickName) {
//                     throw new DuplicityError(`user with nickname ${nickName} already exists`);
//                 } else if (error.keyPattern && error.keyPattern.email) {
//                     throw new DuplicityError(`user with email ${email} already exists`);
//                 } else {
//                     throw new UnknownError("Unknown duplication error");
//                 }
//             }
//             throw error
//         }
//     })()
// }