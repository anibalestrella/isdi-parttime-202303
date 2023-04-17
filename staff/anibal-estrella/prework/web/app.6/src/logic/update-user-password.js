console.log('// LOGIC // updateUserPassword');

import { validateId, validatePassword } from "./helpers/validators.js"
import {findUserById} from  "./helpers/data-managers.js"
import { saveUsers } from "../data.js"

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

    saveUsers()
  }