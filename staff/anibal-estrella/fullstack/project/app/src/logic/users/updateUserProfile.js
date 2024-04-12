import { validators } from 'com'
import {
    loginUser, updateUserEmail, updateUserPassword, updateUserName, updateUserNickName, updateUserAvatar
} from './'

const { validateToken, validateEmail, validateName, validateNickName, validatePassword } = validators

export default async (token, userCurrentName, userCurrentEmail, userCurrentPassword, userCurrentNickname, userNewName, userNewNickName, userNewEmail, userNewPassword, callback) => {
    validateToken(token)
    validateEmail(userCurrentEmail, 'user email')
    validatePassword(userCurrentPassword, 'user password')

    if (userNewEmail !== userCurrentEmail) {
        validateEmail(userNewEmail, 'new user email');
    }

    if (userNewNickName !== userCurrentNickname) {
        validateNickName(userNewNickName, 'new user nick Name');
    }

    if (userNewName !== userCurrentName) {
        validateName(userNewName, 'new user name');
    }

    if (userNewPassword !== userCurrentPassword) {
        validatePassword(userNewPassword, 'new user password');
    }

    try {
        // Authenticate user
        await loginUser(userCurrentEmail, userCurrentPassword);

        // If authentication is successful, update the user's email
        if (userNewEmail !== userCurrentEmail) {
            await updateUserEmail(token, userNewEmail);
        }

        // Optionally, invoke the callback function with any result
        if (callback) {
            callback(null, 'User profile updated successfully.');
        }
    } catch (error) {
        // Handle errors
        if (callback) {
            callback(error);
        } else {
            throw error;
        }
    }
}
