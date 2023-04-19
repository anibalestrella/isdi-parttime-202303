// HELPERS:
// de uso solo en logic.js no se exporta
import { users, posts } from "../../data.js"


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

export function findPostById(postId) {
  let foundPost

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i]
    if (posts[i].id === postId) {
      foundPost = post
      break;
    }
  }
  return foundPost;
}
