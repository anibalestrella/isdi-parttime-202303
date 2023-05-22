import { validateEmail, validateName, validatePassword, validateCallback } from "./helpers/validators.js"
import { saveUsers, findUserByEmail, loadUsers } from "../data.js";

export default function registerUser(name, email, password, repeatPasword, callback) {
  validateName(name, 'name')
  validateEmail(email, 'password')
  validatePassword(password, 'password')
  validatePassword(repeatPasword, 'password')
  validateCallback(callback, 'callback function')

  if (password !== repeatPasword) {
    callback(new Error(`OOPS!\n passwords don't match`))

    return
  }

  findUserByEmail(email, foundUser => {
    if (foundUser) {
      callback(new Error(`OOPS!\n A user with the email: ${email} already exists in the database`))

      return
    }

    let id = 'user-1'

    loadUsers(users => {
      const lastUser = users[users.length - 1]

      if (lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

      const user = {
        id,
        name,
        email,
        password,
        avatar: '../../assets/avatar-default.svg'
      }

      users.push(user)
      // This CALLBACK calls this parent Function's parameter CALLBACK sending a NULL to tell the CALLBACKthere's no erroers to be sent (Happy Path)
      saveUsers(users, () => callback(null))
    })

  })

}