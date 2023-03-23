//DATA
var users=[]

users.push({
  name:'Lars Ulrich',
  email:'lars@gmail.com',
  password:'asdfasdfewr',
});

users.push({
  name:'Eddie Veder',
  email:'veder@gmail.com',
  password:'asdfasdfewr',
});

users.push({
  name:'Bruce Dickinson',
  email:'iron@gmail.com',
  password:'asdfasdfewr',
});
// LOGIC
// PRESENTATION 

var foundUser;

document.querySelector('.login form').addEventListener('submit', function (event) {
  event.preventDefault()
    event.preventDefault();
    document.querySelector(".register").classList.add("off");
    document.querySelector(".login").classList.remove("off");
console.log('FUCK YOU!!')
for (let i = 0; i < users.length; i++) {
  var user = users[i];
  if (user.email === email) {
    foundUser =user;
    break;
  };

  
}
});

// document.querySelector(".login form").addEventlistener("submit", function (event) {
//   event.preventsDefault();
//   document.querySelector(".").classList.add("off");
//   document.querySelector(".").classList.remove("off");

//   var email = document.querySelector('input[name]').value
//   var password = document.querySelector('input[password]')
//   console.log(email, name)
// });

// document.querySelector(".register a").addEventlistener("click", function (event) {
//   event.preventsDefault();
//   document.querySelector(".register").classList.add("off");
//   document.querySelector(".login").classList.remove("off");
//   console.log("Login!");
//   // TODO how to get
// });

