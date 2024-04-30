import { saveUser, findUserById } from '../../data'
import { validators } from 'com'
const { validateToken, validateId, validateName } = validators
import { updateUserName } from '../../logic/users/';

/**
 * updateUserProfile.js
 * 
 * This function updates the user's profile information based on the provided parameters.
 * 
 * @param {string} token - User authentication token.
 * @param {string} userCurrentName - Current username of the user.
 * @param {string} userCurrentEmail - Current email address of the user.
 * @param {string} userCurrentPassword - Current password of the user.
 * @param {string} userCurrentNickname - Current nickname of the user.
 * @param {string} userNewName - New name to be updated for the user.
 * @param {string} userNewNickName - New nickname to be updated for the user.
 * @param {string} userNewEmail - New email address to be updated for the user.
 * @param {string} userNewPassword - New password to be updated for the user.
 * 
 * @throws {TypeError} - If any of the parameters are not of type string.
 * @throws {Error} - If the token is invalid, or if the new name contains invalid characters.
 * 
 * @returns {Promise} - Returns a Promise that resolves when the update operation is successful.
 */

export default async (token, userCurrentName, userCurrentEmail, userCurrentPassword, userCurrentNickname, userNewName, userNewNickName, userNewEmail, userNewPassword) => {
    validateToken(token)
    validateName(userNewName, 'user new name')
    try {
        if (userCurrentName !== userNewName)
            await updateUserName(token, userNewName)

    } catch (error) {
        throw new Error(error)
    }
}
