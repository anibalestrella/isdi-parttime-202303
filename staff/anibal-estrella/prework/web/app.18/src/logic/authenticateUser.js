import { validateEmail, validatePassword} from "./helpers/validators.js"
import {findUserByEmail} from "./helpers/dataManagers.js"

export function authenticateUser(email, password) {
  validateEmail(email)
  validatePassword(password, 'new password')
  const user = findUserByEmail(email)

  if (!user)
    throw new Error('User does not exist in the database')

  if (user.password !== password)
    throw new Error('Wrong password')

  return user.id
}