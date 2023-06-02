console.log('// LOGIC // registerUser');

import { validateEmail, validateName, validatePassword } from "./helpers/validators.js"
import { findUserByEmail } from "./helpers/data-managers.js"
import { users, saveUsers } from "../data.js";
import { DEFAULT_AVATAR_URL } from "../pages/home-page.js"

export function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  const foundUser = findUserByEmail(email)

  if (foundUser)
    throw new Error(`OOPS!\n A user with the email: ${email} already exists in the database`)

  let id = 'user-1'

  //create a fresh copy of the actual DB to amnipulate
  const _users = users()

  // by default add a first user an id
  // if ther's a user in the DB
  // create user id from the last user ID + 1
  const lastUser = _users[_users.length - 1]

  if (lastUser)
    id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

  // if property's name is the same as the variable's name
  const user = {
    id,
    name,
    email,
    password,
    avatar: DEFAULT_AVATAR_URL
  }

  _users.push(user)

  saveUsers(_users)

}