// HELPERS:
// de uso solo en logic.js no se exporta
import { users } from "../../data.js"


export function findUserByEmail(email) {

  // for (let i = 0; i < users.length; i++) {
  //   let user = users[i]

  //   if (user.email === email) return user

  // }
  
  return users.find(user => user.email === email)

}

export function findUserById(userId) {
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

