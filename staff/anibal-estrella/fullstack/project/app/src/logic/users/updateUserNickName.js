import { validators } from 'com'
import context from "./context"
const { validateToken, validateNickName } = validators

/**
 * updateUserNickName:
 * This function updates the nickname of the user.
 * 
 * @param {string} userNewNickName - The new nickname to be updated for the user.
 * 
 * @throws {TypeError} - If the session token or user nickname is not a string.
 * @throws {Error} - If the API request fails or returns an error message.
 * 
 * @returns {Promise} - Returns a Promise that resolves when the nickname update operation is successful.
 */

export default function updateUserNickName(userNewNickName) {
    validateToken(context.token, 'Session Token');
    validateNickName(userNewNickName, 'user NickName')


    return (async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/Users/user-nickname`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${context.token}`,
                },
                body: JSON.stringify({ userNewNickName }),
            })

            if (response.status !== 204) {
                const { message } = await response.json();
                throw new Error(message);
            }
        } catch (error) {
            throw error;
        }
    })()

}
