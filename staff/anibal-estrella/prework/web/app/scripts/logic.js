
function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email)
  validatePassword(password, 'new password')

  var foundUser = findUserByEmail(email)
  if (!foundUser)
    throw new Error('User exists in the database')

  users.push({
    name: name,
    email: email,
    password: password,
  })
}

function authenticateUser(email, password) {
  validateEmail(email)
  validatePassword(password, 'new password')
  foundUser = findUserByEmail(email)
  if (!foundUser)
    throw new Error('User does not exist in the database')

  if (foundUser.password !== password)
    throw new Error('Wrong password')

  return foundUser
}

function findUserByEmail(email) {
  for (let i = 0; i < users.length; i++) {
    user = users[i]
    if (users[i].email === email)
    return users[i]
}
return user
}




function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
  //lookup user data in db
  //check password is correct against user
  var foundUser

  for (let i = 0; i < users.length; i++) {
    var user = users[i]

    if (user.email === email) {
      foundUser = user
      break
    }


    if (!foundUser)
      return false

    if (newPassword !== foundUser.password)
      return false
    if (newPassword !== newPasswordConfirm)
      return false
    if (foundUser.password = newPassword)
      return true


  }
}


function updadateUserAvatar(email, avatar) {
  // TODO input validation
  validateEmail(email)
  // TODO

}

    //TODO: 
    //SIEMPRE TESTEAR LA LOGICA NO EN LA CAPA SUPERIOR!!