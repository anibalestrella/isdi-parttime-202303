import { validateId, validateUrl, validateCallback } from "./helpers/validators.js"
import { findUserById, saveUser } from "../data.js"

export default function updateUserAvatar(userId, url, callback) {
    validateId(userId, 'user id')
    validateUrl(url, 'avatar url')
    validateCallback(callback, 'callback function')
  
 findUserById(userId, user =>{
     if (!user){
         callback(new Error('user not found'))

         return
     }
    
     user.avatar = url
    
     saveUser(user, () => callback(null))
 })
  
  }
  