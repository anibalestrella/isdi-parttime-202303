
function authenticateUser(email, password){
validateEmail(email, )
validatePassword(password, 'new password')

    for (let i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
          foundUser = user
          break
        }
      }


    if (!foundUser ) 
throw new Error('User not found')   
    if (foundUser.password !== password)
throw new Error('Wrong password')


  }
    


    function registerUser(name, email, password){
if (typeof name!== 'string') throw new Error('name must be a string');
if (!name.length) throw new Error('name cannot be empty');
      

      for (let i = 0; i < users.length; i++) {
        var user = users[i]
        
        if (user.email === email) {
          return false
        } else{
          users.push({
            name:`${name}`,
            email:`${email}`,
            password: `${password}`,
          });
          foundUser = user
          return true

        }
      }
    }


    function retrieveUser(email){
      var foundUser
      for (let i = 0; i < users.length; i++) {
        var user = users[i]
        
        if (user.email === email) {
          foundUser = user
          break
        }

        if (!foundUser){
          return false
        } else{

        }
        if (foundUser)
      }
    }




function updateUserPassword(email, password, newPassword, newPasswordConfirm){
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
    if (foundUser.password =newPassword)
    return true


}
}


function updadateUserAvatar(email, avatar){
  // TODO input validation
  validateEmail(email)
  // TODO
  
} 

    //TODO: 
    //SIEMPRE TESTEAR LA LOGICA NO EN LA CAPA SUPERIOR!!