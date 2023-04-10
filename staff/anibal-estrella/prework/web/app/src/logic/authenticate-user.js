console.log('// LOGIC // authenticateUser');


import { validateEmail, validatePassword} from "./helpers/validators.js"
import {findUserByEmail} from "./helpers/data-managers.js"

export function authenticateUser(email, password) {
  validateEmail(email)
  validatePassword(password, 'new password')
  const foundUser = findUserByEmail(email)

  if (!foundUser)
    throw new Error('User does not exist in the database')

  if (foundUser.password !== password)
    throw new Error('Wrong password')

  return foundUser.id
}