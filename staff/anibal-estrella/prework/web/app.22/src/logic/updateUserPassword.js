import { validateId, validatePassword } from "./helpers/validators.js"
import {findUserById} from  "./helpers/dataManagers.js"
import { saveUser } from "../data.js"

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm) {
    //validate 
    validateId(userId, 'user id')
    validatePassword(password, 'new password')
    validatePassword(newPassword, 'new password confirmation')
    const user = findUserById(userId)
  
    //lookup user data in db
  
    //check password is correct against user
  
    if (!user)
      throw new Error('user not found')
  
    if (password !== user.password)
      throw new Error('wrong password')
  
    if (newPassword !== newPasswordConfirm)
      throw new Error('your new passwords don\'t match the confirmation')
  
    if (newPassword === password)
      throw new Error('your new password match the old password, please try another')
  
    user.password = newPassword

    saveUser(user)
  }