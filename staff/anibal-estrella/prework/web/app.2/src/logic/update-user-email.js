console.log('// LOGIC // updateUserEmail');


import { validateEmail } from "./helpers/validators"
import { findUserById } from "./helpers/data-managers"

export function updateUserEmail(userId, newEmail, confirmEmail) {
    validateEmail(newEmail)
    validateEmail(confirmEmail)
    const foundUser = findUserById(userId)

    if (confirmEmail === newEmail) {
        foundUser.email = newEmail
        console.log(foundUser)
    } else {
        throw new Error('your new emails don\'t match the confirmation')
    }
}