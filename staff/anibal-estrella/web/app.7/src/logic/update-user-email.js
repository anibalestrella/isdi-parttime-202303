console.log('// LOGIC // updateUserEmail');


import { validateEmail } from "./helpers/validators.js"
import { findUserById } from "./helpers/data-managers.js"
import { saveUsers } from "../data.js"


export function updateUserEmail(userId, newEmail, confirmEmail) {
    validateEmail(newEmail)
    validateEmail(confirmEmail)
    const foundUser = findUserById(userId)

    if (confirmEmail === newEmail) {
        foundUser.email = newEmail
        saveUsers()

    } else {
        throw new Error('your new emails don\'t match the confirmation')
    }
}