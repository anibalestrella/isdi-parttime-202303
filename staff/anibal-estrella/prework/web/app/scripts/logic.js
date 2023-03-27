
function authenticateUser(email, password){

if(typeof email !== 'string') throw new Error('email must be a string');
if(typeof password!=='string') throw new Error('password must be a string');

    for (let i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
          foundUser = user
          break
        }
      }


    if (!foundUser ) 
throw new Error('User not found');      
    if (foundUser.password !== password)
throw new Error('Wrong password');
  };
    


    function registerUser(name, email, password){
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


    const retrieveUser(email){
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

if (!foundUser){
  return false

    if (newPassword !== foundUser.password)
      return false
    if { newPassword !== newPasswordConfirm }
    return false

    if {foundUser.password =newPassword}
    return true
  

}



    //TODO:

