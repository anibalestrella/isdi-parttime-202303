const { ContentError, TypeError, FormatError } = require('./errors');

// Generic utility function to check if a value is empty (works for strings, arrays, etc.)
function validateNotEmpty(value, explain) {
    if (value === undefined || value === null || value === '') {
        throw new ContentError(`${explain} is empty`);
    }
    if (typeof value === 'string' && !value.trim().length) {
        throw new ContentError(`${explain} is blank`);
    }
    if (Array.isArray(value) && value.length === 0) {
        throw new ContentError(`${explain} is empty`);
    }
}

// Utility function to check if a value is of a specific type
function validateType(value, expectedType, explain) {
    if (typeof value !== expectedType) {
        throw new TypeError(`${explain} must be a ${expectedType}`);
    }
}

// Utility function to validate a string against a regex
function validateRegex(value, regex, explain, errorMsg) {
    if (!regex.test(value)) {
        throw new FormatError(`${explain} ${errorMsg}`);
    }
}

// Utility function to validate string length within a range
function validateStringLength(value, min, max, explain) {
    const length = value.trim().length;
    if (length < min) throw new ContentError(`${explain} must be at least ${min} characters long`);
    if (max && length > max) throw new ContentError(`${explain} cannot exceed ${max} characters`);
}

// Email validation
function validateEmail(email, explain = "Email") {
    validateNotEmpty(email, explain);
    validateType(email, 'string', explain);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateRegex(email, emailRegex, explain, 'is not a valid format');
}

// Password validation
function validatePassword(password, explain = "Password") {
    validateNotEmpty(password, explain);
    validateType(password, 'string', explain);
    validateStringLength(password, 8, null, explain);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    validateRegex(password, passwordRegex, explain, 'format incorrect, should contain one lowercase, one uppercase, one digit, one special character, and be at least 8 characters long');
}

// Name validation
function validateName(name, explain = "Name") {
    validateNotEmpty(name, explain);
    validateType(name, 'string', explain);
    validateStringLength(name, 2, 24, explain);
    const alphaRegex = /^[a-zA-Z\s]+$/;
    validateRegex(name, alphaRegex, explain, 'can only contain alphabetic characters and spaces');
}

// Artist Name validation
function validateArtistName(name, explain = "Artist Name") {
    validateNotEmpty(name, explain);
    validateType(name, 'string', explain);
    validateStringLength(name, 1, 24, explain);
}

// Nickname validation
function validateNickName(nickName, explain = "Nick Name") {
    validateNotEmpty(nickName, explain);
    validateType(nickName, 'string', explain);
    validateStringLength(nickName, 1, 12, explain);
    const nickNameRegex = /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/;
    validateRegex(nickName, nickNameRegex, explain, 'should be a single word without symbols, can contain numbers');
}

// URL validation
function validateUrl(url, explain = 'URL') {
    validateNotEmpty(url, explain);
    validateType(url, 'string', explain);
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
    validateRegex(url, urlRegex, explain, 'is not a valid URL');
}

// City validation
function validateCity(city, explain = "City") {
    validateNotEmpty(city, explain);
    validateType(city, 'string', explain);
}

// Token validation
function validateToken(token, explain = 'Token') {
    validateNotEmpty(token, explain);
    validateType(token, 'string', explain);
    if (token.split('.').length !== 3) throw new ContentError(`${explain} is not a valid token format`);
}

// Callback validation
function validateCallback(callback, explain = "Callback") {
    if (typeof callback !== 'function') {
        throw new TypeError(`${explain} must be a function`);
    }
}

// IP Geolocation validation (array of two numbers: [longitude, latitude])
function validateIpGeoLocation(ipGeoLocation, explain = 'IP GeoLocation') {
    validateArray(ipGeoLocation, explain);
    if (ipGeoLocation.length !== 2) throw new ContentError(`${explain} must contain exactly two values (latitude and longitude)`);

    const [latitude, longitude] = ipGeoLocation;
    validateCoordinates(latitude, longitude, explain);
}

// Coordinates validation
function validateCoordinates(latitude, longitude, explain = 'Coordinates') {
    validateType(latitude, 'number', `${explain} latitude`);
    validateType(longitude, 'number', `${explain} longitude`);
    if (latitude < -90 || latitude > 90) throw new ContentError(`${explain} latitude must be between -90 and 90`);
    if (longitude < -180 || longitude > 180) throw new ContentError(`${explain} longitude must be between -180 and 180`);
}

// Artist ID validation
function validateArtistId(id, explain = 'Artist ID') {
    validateNotEmpty(id, explain);
    validateType(id, 'number', explain);
}

// ID validation (Hexadecimal, length 24)
const HEX_DICTIONARY = '0123456789abcdef';
function validateId(id, explain = 'ID') {
    validateNotEmpty(id, explain);
    validateType(id, 'string', explain);
    if (id.trim().length !== 24) throw new ContentError(`${explain} must be 24 characters long`);
    [...id].forEach(char => {
        if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`${explain} must be a hexadecimal string`);
    });
}

// Place ID validation (UUID format)
function validatePlaceId(place, explain = 'Place ID') {
    validateNotEmpty(place, explain);
    validateType(place.placeId, 'string', explain);
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    validateRegex(place.placeId, uuidRegex, explain, 'is not a valid UUID format');
}

// Text validation
function validateText(text, explain = 'Text') {
    validateNotEmpty(text, explain);
    validateType(text, 'string', explain);
}

// Price validation (Euro format)
function validateEuroPrice(price, explain = "Price") {
    if (typeof price === 'number') price = price.toString(); // Convert number to string if necessary
    validateNotEmpty(price, explain);
    validateType(price, 'string', explain);
    const euroPriceRegex = /^\d+,\d{2}$/;
    validateRegex(price, euroPriceRegex, explain, 'is not a valid euro price format (e.g., 123,45)');
}

// Generic Array validation
function validateArray(value, explain = 'Array') {
    if (!Array.isArray(value)) throw new TypeError(`${explain} must be an array`);
    if (value.length === 0) throw new ContentError(`${explain} is empty`);
}

// LineUp validation
function validateLineUp(lineUp, explain = 'Line Up') {
    validateArray(lineUp, explain);
    lineUp.forEach((item, index) => {
        validateArtistId(item.discogsId, `${explain}[${index}].discogsId`);
        validateNotEmpty(item.category, `${explain}[${index}].category`);
    });
}

// Score validation
function validateScore(score, explain = 'Score') {
    validateArray(score, explain);
    score.forEach((s, index) => {
        validateId(s.user, `${explain}[${index}].user`);
        if (typeof s.value !== 'number') {
            throw new TypeError(`${explain}[${index}].value must be a number`);
        }
        if (s.value < 0) throw new Error(`${explain}[${index}].value cannot be negative`);
    });
}

// Likes validation
function validateLikes(likes, explain = 'Likes') {
    validateArray(likes, explain);
    likes.forEach((like, index) => {
        validateId(like, `${explain}[${index}]`);
    });
}

// Event Reviews validation
function validateEventReviews(eventReviews, explain = 'Event Reviews') {
    validateArray(eventReviews, explain);
    eventReviews.forEach((review, index) => {
        validateId(review, `${explain}[${index}]`);
    });
}

// Date validation (in the past)
function validateDates(dateString, explain = "Date") {
    validateNotEmpty(dateString, explain);
    validateType(dateString, 'string', explain);
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new ContentError(`${explain} is not a valid date format`);
    if (date >= new Date()) throw new ContentError(`${explain} must be in the past`);
}

// Validation for File Upload
function validateFileUpload(fileObject, explain = 'File') {
    validateNotEmpty(fileObject, explain);
    validateType(fileObject, 'object', explain);
    if (!fileObject.hasOwnProperty('file') || !fileObject.hasOwnProperty('fileName')) {
        throw new TypeError(`${explain} must contain a file and fileName`);
    }

    const validImageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"];
    const fileMatch = fileObject.file.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,([A-Za-z0-9+/=]+)$/);

    if (!fileMatch) throw new TypeError(`${explain} is not a valid base64 file`);

    const mimeType = fileMatch[1];
    const base64Data = fileMatch[2];
    const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB
    const base64Length = base64Data.length;
    const padding = (base64Data.endsWith('==') ? 2 : (base64Data.endsWith('=') ? 1 : 0));
    const sizeInBytes = (base64Length * 3 / 4) - padding;

    if (!validImageMimeTypes.includes(mimeType)) throw new TypeError(`${explain} mime type is not valid`);
    if (sizeInBytes > maxSizeInBytes) throw new ContentError(`${explain} file is too large`);
}

// Export all validation functions
module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validateArtistName,
    validateNickName,
    validateUrl,
    validateCity,
    validateToken,
    validateCallback,
    validateIpGeoLocation,
    validateCoordinates,
    validateArtistId,
    validateId,
    validatePlaceId,
    validateText,
    validateEuroPrice,
    validateArray,
    validateLineUp,
    validateScore,
    validateLikes,
    validateEventReviews,
    validateDates,
    validateFileUpload
};