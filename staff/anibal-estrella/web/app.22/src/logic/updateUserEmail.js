import { validateEmail } from "./helpers/validators.js"
import {findUserById} from  "./helpers/dataManagers.js"
import { saveUser } from "../data.js"

export default function updateUserEmail(userId, newEmail, confirmEmail) {
    validateEmail(newEmail)
    validateEmail(confirmEmail)
    const user = findUserById(userId)

    if (!user)
        throw new Error('user not found')

    if (confirmEmail === newEmail) {
        user.email = newEmail
        saveUser(user)

    } else {
        throw new Error('your new emails don\'t match the confirmation')
    }
}