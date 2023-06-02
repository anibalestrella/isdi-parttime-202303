console.log('// LOGIC // registerUser');

import { validateEmail, validateName, validatePassword } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/data-managers.js"
import { users, saveUsers } from "../data.js";

export function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  const foundUser = findUserByEmail(email)

  if (foundUser)
    throw new Error('User exists in the database')
    
  let id = 'user-1'

  const lastUser = users[users.length - 1]
  // by default add a first user an id
  // if ther's a user in the DB
  // create user id from the last user ID + 1
  if (lastUser)
    id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

  // if property's name is the same as the variable's name
  const user = {
    id,
    name,
    email,
    password
  }

  users.push(user)

  saveUsers()

}