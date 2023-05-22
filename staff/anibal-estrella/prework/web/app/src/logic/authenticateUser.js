import { validateEmail, validatePassword, validateCallback } from "./helpers/validators.js"
import { findUserByEmail } from "../data.js"

/* 
*
* authenticates a user by email and password
* @param {String} email The user's email
* @param {String} password The user's passaword
*
*/
export function authenticateUser(email, password, callback) {
  validateEmail(email)
  validatePassword(password, 'new password')
  validateCallback(callback, 'callback function')

  findUserByEmail(email, user => {
    if (!user) {
      callback(new Error('User does not exist in the database'))

      return
    }

    if (user.password !== password) {
      callback(new Error('Wrong password'))

      return
    }

    callback(null, user.id)
  })
}