const { ContentError, FormatError } = require('./errors')

/**
 * Validates an email
 * @param {string} email an email
 */

function validateEmail(email, explain = "Email") {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (email === " ") throw new ContentError(`${explain} should not be a blank space`)
    if (typeof email !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!email.trim().length) throw new ContentError(`${explain} is blank`)
    if (!emailRegex.test(email)) throw new FormatError(`${email} is not valid ${explain} format`)
}

/**
 * validates a password
 * @param {string} password the password
 * @param {string} explain alternative edescription in case of error
 */
//passwordRegex This regex ensures that the password contains at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least 8 characters long

function validatePassword(password, explain = "Password") {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!password) throw new ContentError(`${explain} is blank`)
    if (typeof password !== "string") throw new TypeError(`${explain} is not a string`);
    if (password === " ") throw new ContentError(`${explain} should not be a blank space`)
    if (password.trim().length < 8) throw new RangeError(`${explain} must be more than 8 characters long`);
    if (!passwordRegex.test(password)) throw new FormatError(`${explain} format incorrect, should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and should be at least 8 characters long`)
}

const regex = /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/;
const alphaRegex = /^[a-z\s]+$/;
;

/**
 * validates a name
 * @param {string} name the name
 */

function validateName(name, explain = "Name") {
    if (name === " ") throw new ContentError(`${explain} should not be a blank space`)
    if (typeof name !== 'string') throw new TypeError(`The ${explain} > ${name} must be a string`);
    if (!name.trim().length) throw new Error(`${explain} is blank`);
    if (name.trim().length < 2) throw new Error(`${explain} must be at least two characters long`);
    if (name.trim().length > 24) throw new Error(`${explain} cannot exceed 24 characters`);
    if (!alphaRegex.test(name)) throw new Error(`${explain} can only contain lowercase alphabetic characters and spaces`);
}

/**
 * validates a name
 * @param {string} name the name
 */

function validateArtistName(name, explain = "Artist Name") {
    if (name === " ") throw new ContentError(`${explain} should not be a blank space`)
    if (typeof name !== 'string') throw new TypeError(`The ${explain} > ${name} must be a string`);
    if (!name.trim().length) throw new Error(`${explain} is blank`);
    if (name.trim().length < 1) throw new Error(`${explain} must be at least one character long`);
    if (name.trim().length > 24) throw new Error(`${explain} cannot exceed 24 characters`);
}

/**
 * validates a name
 * @param {string} nickName the user's nick name
*/
function validateNickName(nickName, explain = "nickName") {
    if (typeof nickName !== 'string') throw new TypeError(`The ${explain} > ${nickName} must be a string`);
    if (nickName === " ") throw new ContentError(`${explain} should not be a blank space`)
    if (!nickName.trim().length) throw new Error(`${explain} is blank`);
    if (nickName.trim().length > 12) throw new Error(`${explain} cannot exceed 12 characters`);
    if (!regex.test(nickName)) throw new Error(`${explain} should be a single word without symbols and can contain numbers`);
}


/**
 * Validates an URL string
 * @param {string} url an URL
 * @param {string} explain alternative edescription in case of error
*/
function validateUrl(url, explain = 'URL') {
    if (typeof url !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!url.trim().length) throw new ContentError(`${explain} is blank`)
}


/**
 * validates an id
 * @param {string} id the user's id
*/

const HEX_DICTIONARY = '0123456789abcdef'

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is ${typeof id} and must be a string`)
    if (id.trim().length !== 24) throw new ContentError(`${explain} doesn't have 24 characters`)
    for (let i = 0; i < id.length; i++) {
        const char = id[i];

        if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} is not a hexadecimal`)
    }
}

/**
 * validates an artist's id
 * @param {string} id the artist's id
*/
function validateArtistId(id, explain = 'id') {
    if (typeof id !== 'number') throw new TypeError(`${explain} is ${typeof id} and must be a number`)
    if (id.length < 1)
        throw new ContentError(`${explain} doesn't have more than 1 characters`)
    for (let i = 0; i < id.length; i++) {
        const char = id[i];

        if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} is not a hexadecimal`)
    }
}

/**
 * validates a places's id
 * @param {string} id the place's id
*/
function validatePlaceId(id, explain = 'Place id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is ${typeof id} and must be a string`)
    if (id.trim().length !== 7) throw new ContentError(`${explain} doesn't have 7 characters`)
    for (let i = 0; i < id.length; i++) {
        const char = id[i];

        if (!'0123456789'.includes(char)) throw new ContentError(`${explain} is not a decimals`)
    }
}

/**
 * validates a text field
 * @param {*} text the text content
 */
function validateText(text, explain = 'text') {
    if (text.length < 1) throw new Error(`${explain} must be longer than one character'`)
    if (typeof text !== 'string') throw new TypeError(`${explain} must be a string`)
    if (!text.trim().length) throw new ContentError(`${explain} is blank`)
}


/**
 * validates user's IP geolocation data [lon, lat]
 * @param {number[]} ipGeoLocation User's city geo data [lon, lat] 
*/
function validateIpGeoLocation(ipGeoLocation, explain = 'IP GeoLocation') {
    debugger
    if (!Array.isArray(ipGeoLocation)) throw new TypeError(`${explain} must be an array`);

    if (ipGeoLocation.length !== 2) throw new ContentError(`${explain} must contain exactly two values (latitude and longitude)`);

    const [latitude, longitude] = ipGeoLocation;

    if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
        throw new ContentError(`${explain} invalid latitude format`);
    }

    if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
        throw new ContentError(`${explain} invalid longitude format`);
    }
}

/**
 * validates a city
 * @param {string} city the city
*/
function validateCity(city, explain = "City") {
    if (typeof city !== 'string') throw new TypeError(`The ${explain} > ${city} must be a string`);
    if (!city.trim().length) throw new ContentError(`${explain} is blank`)
    if (city === " ") throw new ContentError(`${explain} should not be a blank space`)
}

/**
 * validates price in € format
 * @param {string} price the price value to validate
*/
function validateEuroPrice(price, explain = "price") {
    // This regex assumes a price in euro format like "123,45"
    const euroPriceRegex = /^\d+,\d{2}$/;
    if (typeof price === 'number') {
        // If the input is a number, convert it to a string
        price = price.toString();
    }
    if (typeof price !== 'string') throw new TypeError(`${explain} must be a string`);
    if (!price.trim().length) throw new ContentError(`${explain} is blank`);
    if (!euroPriceRegex.test(price)) throw new ContentError(`${explain} is not a valid price`);
}

/**
 * validates a callback
 * @param {string} callback the city
*/
function validateCallback(callback, explain = "callback") {
    if (typeof callback != 'function') throw new Error(`${explain} must be a function`)
}

/**
 * validates token
 * @param {string} token the token
*/
function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is ${typeof id} and must be a string`)
    if (token.split('.').length != 3) throw new ContentError(`${explain} is not `)
}


/**
 * Validates an uploaded file.
 * @param {Object} fileObject - The file information to validate.
 * @param {string} [explain='file'] - Explanation for the error message if the file is missing.
 * @returns {boolean} - Returns true if the file is valid, otherwise false.
 * @throws {Error} - Throws an error if the file is missing or has an invalid format.
 */

function validateFileUpload(fileObject, explain = 'file') {
    if (!fileObject) {
        throw new Error(`${explain} is missing`);
    }

    if (typeof fileObject !== 'object') {
        throw new ContentError(`${explain} is is not a valid format, object: ${typeof fileObject}`);
    }


    const maxSizeInMB = 25;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'mkv'];
    const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const validImageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"];
    const fileName = fileObject.fileName;
    const fileExtension = fileObject.fileName.split('.').pop().toLowerCase();

    // Check if 'file' and 'fileName' properties exist
    if (!fileObject.hasOwnProperty('file') || !fileObject.hasOwnProperty('fileName')) {
        throw new TypeError(`${fileName} must be valid file`);
    }


    // Check if the file extension is valid
    if (
        !videoExtensions.includes(fileExtension) &&
        !audioExtensions.includes(fileExtension) &&
        !imageExtensions.includes(fileExtension)
    ) {
        throw new TypeError(`${fileObject.fileName} must be valid file`);
    }

    // Check if 'file' is a valid base64 string with a valid image mime type
    const fileMatch = fileObject.file.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,([A-Za-z0-9+/=]+)$/);
    if (!fileMatch) {
        throw new TypeError(`${fileObject.fileName} must be valid file`);
    }

    const mimeType = fileMatch[1];
    const base64Data = fileMatch[2];

    // Check the mime type
    if (!validImageMimeTypes.includes(mimeType)) {
        throw new TypeError(`${fileObject.fileName} must be valid file`);
    }

    // Check the size of the base64 string
    const base64Length = base64Data.length;
    const padding = (base64Data.endsWith('==') ? 2 : (base64Data.endsWith('=') ? 1 : 0));
    const sizeInBytes = (base64Length * 3 / 4) - padding;

    if (sizeInBytes > maxSizeInBytes) {
        throw new ContentError(`${fileObject.fileName} is larger than ${maxSizeInBytes} bytes`);
    }

}

module.exports = validateFileUpload;

module.exports = {
    validatePassword,
    validateEmail,
    validateName,
    validateNickName,
    validateUrl,
    validateId,
    validateText,
    validateCity,
    validateToken,
    validateIpGeoLocation,
    validateEuroPrice,
    validateFileUpload,
    validateArtistId,
    validatePlaceId,
    validateCallback,
    validateArtistName
}