import { validators } from 'com'
import context from "./context"
const { validateToken, validateEmail } = validators

/**
 * APP/ UpdateUserEmail:
 * Updates the user's email address.
 * 
 * @param {string} userNewEmail - The new email address to be updated for the user.
 * @param {string} userNewEmailConfirm - Confirmation of the new email address.
 * 
 * @throws {TypeError} - If the parameters are not of type string.
 * @throws {Error} - If the session token is invalid or if there is an error during the update process.
 * 
 * @returns {Promise} - A Promise that resolves when the update operation is successful.
 */

export default function updateUserEmail(userNewEmail, userNewEmailConfirm) {
    validateToken(context.token, 'Session Token');
    validateEmail(userNewEmail, 'user Email')
    validateEmail(userNewEmailConfirm, 'user Email confirmation')

    return (async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/Users/user-email`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${context.token}`,
                },
                body: JSON.stringify({ userNewEmail, userNewEmailConfirm }),
            })

            if (response.status !== 204) {
                const { error, type } = await response.json();
                throw new Error(error, type);
            }
        } catch (error) {
            throw error
        }
    })()

}
