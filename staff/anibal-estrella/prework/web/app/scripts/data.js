//DATA
var users = []

users.push({
  name: 'Lars Ulrich',
  email: 'metallica@gmail.com',
  password: '123',
});

users.push({
  name: 'Eddie Vedder',
  email: 'pj@gmail.com',
  password: '123',
});

users.push({
  name: 'Bruce Dickinson',
  email: 'iron@gmail.com',
  password: '123',
});

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