console.log('// LOGIC // registerUser');

import { validateEmail, validateName, validatePassword } from "./helpers/validators.js"
import {findUserByEmail} from "./helpers/data-managers.js"
import { users } from "../data.js";

export function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  const foundUser = findUserByEmail(email)

  if (foundUser)
    throw new Error('User exists in the database')

  let lastUser = users[users.length - 1]
  // by default add a first user an id
  let id = 'user-01'
  // if ther's a user in the DB
  if (lastUser) {
    // create user id from the last user ID + 1
    id = 'user-0' + parseInt(name.slice(5)) + 1


    // users.push({
    //   id: id,
    //   name: name,
    //   email: email,
    //   password: password,
    // })

    // if property's name is the same as the variable's name
    const user = {
      id,
      name,
      email,
      password
    }

    users.push(user)
  }
}