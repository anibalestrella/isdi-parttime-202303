    
export function registerUser(name, email, password) {
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

export function authenticateUser(email, password) {
  validateEmail(email)
  validatePassword(password, 'new password')
  foundUser = findUserByEmail(email)

  if (!foundUser)
    throw new Error('User does not exist in the database')

  if (foundUser.password !== password)
    throw new Error('Wrong password')

  return foundUser
}

export function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
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

export function updateUserAvatar(email, avatar) {
  validateEmail(email)
  validateUrl(avatar, 'avatar url')

  var foundUser = findUserByEmail(email)

  if (!foundUser)
      throw new Error('user not found')

  foundUser.avatar = avatar
}



export function retrieveUser(email) {
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


/// helper de uso solo en logic no se exporta
function findUserByEmail(email) {
  var foundUser

  for (let i = 0; i < users.length; i++) {
    user = users[i]
    if (users[i].email === email){

      foundUser = user
      
      break;
    }
  }
  return foundUser;
}