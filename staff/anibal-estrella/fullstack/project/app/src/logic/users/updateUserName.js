import { validators } from 'com';

const { validateToken, validateName } = validators;

/**
 * updateUserName.js
 * 
 * This function updates the user's username with the provided new username.
 * 
 * @param {string} token - User authentication token.
 * @param {string} userNewName - New username to be updated.
 * 
 * @throws {TypeError} - If the token or new username is not a string.
 * @throws {Error} - If the token or new username is blank, or if the new username contains invalid characters.
 * 
 * @returns {Promise<void>} - Returns a Promise that resolves when the update operation is successful.
 */
export default async (token, userNewName) => {
    validateToken(token);
    validateName(userNewName, 'user New Name');
    console.log(`#################################### ${userNewName} ####################################`);
    debugger

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/user-name`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userNewName }),
        });

        if (response.status !== 204) {
            const { message } = await response.json();
            throw new Error(message);
        }
    } catch (error) {
        throw error.message; // Return the error message
    }
}

