import { saveUser, findUserById } from '../../data'
import { validators } from 'com'
import context from "./context"
const { validateToken, validateId, validateName, validateNickName } = validators
import { updateUserName, updateUserNickName, updateUserEmail, updateUserPassword, updateUserAvatar } from '../../logic/users/'

/**
 * updateUserProfile:
 * This function updates the user's profile information based on the provided parameters.
 * 
 * @param {string} userCurrentName - Current username of the user.
 * @param {string} userCurrentEmail - Current email address of the user.
 * @param {string} userCurrentNickName - Current nickname of the user.
 * @param {string} userNewName - New name to be updated for the user.
 * @param {string} userNewNickName - New nickname to be updated for the user.
 * @param {string} userNewEmail - New email address to be updated for the user.
 * @param {string} userNewEmailConfirm - Confirmation of the new email address.
 * @param {string} userNewPassword - New password to be updated for the user.
 * 
 * @throws {Error} - If any of the parameters are not of type string.
 * 
 * @returns {Promise} - Returns a Promise that resolves with an array of names of the changes made.
 * 
 */

export default async (userCurrentName, userCurrentEmail, userCurrentNickName, userNewName, userNewNickName, userNewEmail, userNewEmailConfirm, userNewPassword, userNewPasswordConfirm, userCurrentAvatar, userNewAvatar, avatarObject) => {
    validateToken(context.token, 'Session Token');

    const changes = [];
    try {



        if (userNewName)
            if (userCurrentName !== userNewName) {
                await updateUserName(userNewName)
                changes.push(`Name: ${userNewName}`);
            }
        if (userNewNickName)
            if (userCurrentNickName !== userNewNickName) {
                await updateUserNickName(userNewNickName)
                changes.push(`Nickname: ${userNewNickName}`);
            }
        if (userNewEmail)
            if (userCurrentEmail !== userNewEmail) {
                await updateUserEmail(userNewEmail, userNewEmailConfirm)
                changes.push(`Email: ${userNewEmail}`);
            }
        if (userNewPassword)
            if (userNewPassword !== !userNewPassword) {
                await updateUserPassword(userNewPassword, userNewPasswordConfirm)
                changes.push(`Password`);
            }

        if (userNewAvatar)
            if (userNewAvatar !== !userNewAvatar) {
                await updateUserAvatar([avatarObject])
                changes.push(`Avatar`);
            }


    } catch (error) {
        throw new Error(error.message)
    }

    return changes
}
