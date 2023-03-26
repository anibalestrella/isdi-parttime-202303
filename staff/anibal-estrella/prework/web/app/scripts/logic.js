
function authentificateUser(email, password){

    for (let i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
          foundUser = user
          break
        }
      }


    if (!foundUser || foundUser.password !== password) {
      return false
    }
    return true
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

    //TODO:
// show "Hola USENAME"
// add link to profile in home page and open profile panel
// add  form in profile to change password, view new pass and confirm new pass
 
