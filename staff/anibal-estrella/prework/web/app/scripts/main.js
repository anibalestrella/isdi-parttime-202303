// DATA /data.js
// PRESENTATION /main.js
// LOGIC /logic.js

var registerPage= document.querySelector(".register")
var loginPage= document.querySelector(".login")
var homePage= document.querySelector(".home")
var profilePanel = document.querySelector('.profile')

var foundUser;
var name;
var authenticatedUserEmail;

loginPage.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault()
  
    var email =  loginPage.querySelector('input.email').value
    var password = loginPage.querySelector('input.password').value
    var result = authenticateUser(email, password);

    if (result === false) {
      alert('Wrong email or password!')
  } else {
      authenticatedUserEmail = foundUser.email
      authenticatedUserName = foundUser.name;

      loginPage.classList.add("off");
      homePage.classList.remove("off")
      homePage.querySelector('.hello-user-name').innerHTML = `${authenticatedUserName}`;
  }
})

loginPage.querySelector('p a').onclick = function (event) {
  loginPage.classList.add("off");
  registerPage.classList.remove("off");
}

registerPage.querySelector('form').onsubmit = function (event){
  event.preventDefault()
  var name = registerPage.querySelector('input.name').value
  var email = registerPage.querySelector('input.email').value
  var password = registerPage.querySelector('input.password').value
  var result = registerUser(name, email, password)

  if (result === false) {
    alert(`The Email: ${email} is already registered in our DB, try it again.`)
  } else {
    registerPage.classList.add("off");
    homePage.classList.remove("off");
  }
}

registerPage.querySelector('p a').onclick = function (event) {
  registerPage.classList.add("off");
  loginPage.classList.remove("off");
}



homePage.querySelector('form').addEventListener('submit',function (event){
  event.preventDefault()

  var password = registerPage.querySelector('input.password').value
  var result = registerUser(email, password)

  if (result === false) {
    alert(`The Email: ${email} is already registered in our DB, try it again.`)
  } else {
    registerPage.classList.add("off");
    homePage.classList.remove("off");
  }
})

homePage.querySelector('.menu-profile').onclick = function (event) {
  profilePanel.classList.remove("off");
}


profilePanel.querySelector('form').onsubmit = function (event) {
   event.preventDefault()

   var password = profilePanel.querySelector('input.password').value
   var newPassword = profilePanel.querySelector('input.newPassword').value
   var newPasswordConfirm = profilePanel.querySelector('input.newPasswordConfirm').value

console.log({password},{newPassword},{newPasswordConfirm});

if (condition) {
  
} else {
  
}
}

homePage.querySelector('.menu-logout').onclick =
function () {
  homePage.classList.add("off");
  loginPage.classList.add("off");
  profilePanel.classList.add("off");
}



updateUserAvatarForm.onsubmit = function (event) {
  event.preventDefault()
}

homePage.querySelector('.logout').onclick = 
function (){
  hide(homePage, profilePanel, registerPage)
}

//pasas multiples arguments gracias a "..." y con un loop los tratas como array
function show(...containers) {
  for (var i = 0; i < containers.length; i++) 
  containers[i].classList.remove = "off";
}

function hide(...containers) {
  for (var i = 0; i < containers.length; i++) 
  containers[i].classList.add = "off";
}
