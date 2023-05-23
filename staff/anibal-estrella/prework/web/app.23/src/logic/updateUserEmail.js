import { validateEmail, validateCallback } from "./helpers/validators.js"
import { saveUser, findUserById } from "../data.js"

export default function updateUserEmail(userId, newEmail, confirmEmail, callback) {
    validateEmail(newEmail)
    validateEmail(confirmEmail)
    validateCallback(callback, 'callback function')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (confirmEmail !== newEmail) {
            callback(new Error('your new emails don\'t match the confirmation'))

            return
        }

        user.email = newEmail

        saveUser(user, () => callback(null))
    })
}