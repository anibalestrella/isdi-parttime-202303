import { validateId, validatePassword, validateCallback } from "./helpers/validators.js"
import { findUserById, saveUser } from "../data.js"

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validateId(userId, 'user id')
    validatePassword(password, 'new password')
    if (newPassword === password) throw new Error('your new password match the old password, please try another')

    validatePassword(newPassword, 'new password confirmation')
    if (newPassword !== newPasswordConfirm) throw new Error('your new passwords don\'t match the confirmation')

    validateCallback(callback, 'callback function')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (password !== user.password) {
            callback(new Error('wrong password'))

            return
        }

        user.password = newPassword
    
        saveUser(user, () => callback(null))
    })
}