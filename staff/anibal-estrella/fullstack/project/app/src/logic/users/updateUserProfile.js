import { validators } from 'com'
import {
    isUserLoggedIn, updateUserEmail, updateUserPassword, updateUserName, updateUserNickName, updateUserAvatar
} from './'

const { validateToken, validateEmail, validateName, validateNickName, validatePassword } = validators

export default async (token, userCurrentName, userCurrentEmail, userCurrentPassword, userCurrentNickname, userNewName, userNewNickName, userNewEmail, userNewPassword) => {
    validateToken(token)
    validateName(userNewName, 'user new name')
    console.log(userNewName)
}

