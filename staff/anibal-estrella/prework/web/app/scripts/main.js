// DATA /data.js
// PRESENTATION /main.js
// LOGIC /logic.js

var resgisterPage= document.querySelector(".register")
var loginPage= document.querySelector(".login")
var homePage= document.querySelector(".home")

var foundUser;
var name;
var authenticatedEmail;

loginPage.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault()
  
    var email =  loginPage.querySelector('input.email').value
    var password = loginPage.querySelector('input.password').value
    var result = authentificateUser(email, password);

    if (result === false) {
      alert('Wrong email or password!')
  } else {
      authenticatedEmail = foundUser.email
      authenticatedUserName = foundUser.name;

      loginPage.classList.add("off");
      homePage.classList.remove("off")
      homePage.querySelector('.hello-user-name').innerHTML = `${authenticatedUserName}`;
  }
})

loginPage.querySelector('p a').addEventListener('click', function (event) {
  loginPage.classList.add("off");
  resgisterPage.classList.remove("off");
})

resgisterPage.querySelector('form').addEventListener('submit',function (event){
  event.preventDefault()
  var name = resgisterPage.querySelector('input.name').value
  var email = resgisterPage.querySelector('input.email').value
  var password = resgisterPage.querySelector('input.password').value
  var result = registerUser(name, email, password)

  if (result === false) {
    alert(`The Email: ${email} is already registered in our DB, try it again.`)
  } else {
    resgisterPage.classList.add("off");
    homePage.classList.remove("off");
  }
})

resgisterPage.querySelector('p a').addEventListener('click', function (event) {
  resgisterPage.classList.add("off");
  loginPage.classList.remove("off");
})



homePage.querySelector('form').addEventListener('submit',function (event){
  event.preventDefault()

  var password = resgisterPage.querySelector('input.password').value
  var result = registerUser(, email, password)

  if (result === false) {
    alert(`The Email: ${email} is already registered in our DB, try it again.`)
  } else {
    resgisterPage.classList.add("off");
    homePage.classList.remove("off");
  }
})
