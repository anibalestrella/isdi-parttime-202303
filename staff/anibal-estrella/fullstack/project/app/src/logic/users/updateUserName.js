import { validators } from 'com';
import context from "./context"
const { validateToken, validateName } = validators;

/**
 * APP/  updateUserName.js
 * 
 * This function updates the user's username with the provided new username.
 * 
 * @param {string} context.token - User authentication token.
 * @param {string} userNewName - New username to be updated.
 * @throws {Error} - If the token or new username is blank, or if the new username contains invalid characters.
 * 
 * @returns {Promise<void>} - Returns a Promise that resolves when the update operation is successful.
 */
export default function updateUserName(userNewName) {
    validateToken(context.token, 'Session Token');
    validateName(userNewName, 'user New Name');

    return (async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/user-name`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${context.token}`,
                },
                body: JSON.stringify({ userNewName }),
            });

            if (response.status !== 204) {
                const { error, type } = await response.json();
                throw new Error(error, type);
            }
        } catch (error) {
            throw error;
        }

    })()
}

