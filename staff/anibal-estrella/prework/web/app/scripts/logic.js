
function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

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

function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
  //validate 
  validateEmail(email)
  validatePassword(password, 'new password')
  validatePassword(newPassword, 'new password confirmation')
  var foundUser = findUserByEmail(email)

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


function updadateUserAvatar(email, avatar) {
  // TODO input validation
  validateEmail(email)
  // TODO

}



function retrieveUser(email) {
  validateEmail(email)

  var foundUser = findUserByEmail(email)

  if (!foundUser)
    throw new Error('user not found')

  var user = {
    name: foundUser.name,
    email: foundUser.email
  }

  if (foundUser.avatar)
    user.avatar = foundUser.avatar

  return user
}

    //TODO: 
    //SIEMPRE TESTEAR LA LOGICA NO EN LA CAPA SUPERIOR!!