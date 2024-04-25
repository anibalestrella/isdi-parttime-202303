import { validators } from 'com';

const { validateName, validateEmail, validatePassword } = validators;

/**
 * Registers a new user with the provided information.
 * 
 * @param {string} name - The user's name.
 * @param {string} nickName - The user's nickname.
 * @param {string} email - The user's email address.
 * @param {string} emailConfirm - Confirmation of the user's email address.
 * @param {string} password - The user's password.
 * @param {string} repeatPassword - Confirmation of the user's password.
 * @param {string} city - The user's city.
 * @param {string} ipGeoLocation - The user's IP geo-location.
 * 
 * @throws {Error} - If the provided email and email confirmation do not match.
 * @throws {Error} - If the provided password and repeated password do not match.
 * 
 * @returns {Promise<void>} - Returns a Promise that resolves if registration is successful.
 */
export default async (name, nickName, email, emailConfirm, password, repeatPassword, city, ipGeoLocation) => {
    validateName(name, 'name');
    validateEmail(email, 'email');
    validatePassword(password, 'password');

    if (email !== emailConfirm) {
        throw new Error("Emails do not match, please try again");
    }

    if (password !== repeatPassword) {
        throw new Error("Passwords do not match, please try again");
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, nickName, email, password, city, ipGeoLocation })
        });

        if (response.status !== 201) {
            const body = await response.json();
            throw new Error(body.error);
        }
    } catch (error) {
        throw new Error("There was a problem with the registration: " + error.message);
    }
};
