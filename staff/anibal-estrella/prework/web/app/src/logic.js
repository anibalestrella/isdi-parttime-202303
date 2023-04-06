console.log('//// LOGIC');

import { validateEmail, validateName, validatePassword, validateUrl, validateId } from "./validators.js"
import { users } from "./data.js"

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

export function updateUserPassword(userId, password, newPassword, newPasswordConfirm) {
  //validate 
  validateId(userId, 'user id')
  validatePassword(password, 'new password')
  validatePassword(newPassword, 'new password confirmation')
  const foundUser = findUserById(userId)

  //lookup user data in db

  //check password is correct against user

  if (!foundUser)
    throw new Error('user not found')

  if (password !== foundUser.password)
    throw new Error('wrong password')

  if (newPassword !== newPasswordConfirm)
    throw new Error('your new passwords don\'t match the confirmation')

  if (newPassword === password)
    throw new Error('your new password match the old password, please try another')

  foundUser.password = newPassword
}




export function retrieveUser(userId) {
  validateId(userId, 'user id')

  const foundUser = findUserById(userId)

  if (!foundUser)
    throw new Error('user not found')

  const user = {
    name: foundUser.name,
  }

  if (foundUser.avatar)
    user.avatar = foundUser.avatar

  return user
}

export function updateUserAvatar(userId, avatar) {
  validateId(userId, 'user id')
  validateUrl(avatar, 'avatar url')

  const foundUser = findUserById(userId)

  if (!foundUser)
    throw new Error('user not found')

  foundUser.avatar = avatar
}
// HELPERS:
// de uso solo en logic.js no se exporta
function findUserByEmail(email) {
  let foundUser

  for (let i = 0; i < users.length; i++) {
    let user = users[i]
    if (users[i].email === email) {
      foundUser = user
      break;
    }
  }
  return foundUser;
}

function findUserById(userId) {
  let foundUser

  for (let i = 0; i < users.length; i++) {
    let user = users[i]
    if (users[i].id === userId) {
      foundUser = user
      break;
    }
  }
  return foundUser;
}