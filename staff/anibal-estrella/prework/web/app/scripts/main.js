// ESTA ES LA CAPA De PRESENTACION
//SOLO IMPORTA LÓGICA
//NO EXPORTA NADA

var name;
var authenticatedUserEmail;
var authenticatedUserName;

var registerPage = document.querySelector(".register")
var registerForm = registerPage.querySelector('form')

var loginPage = document.querySelector(".login")
var loginForm = loginPage.querySelector('form')


var homePage = document.querySelector(".home")
var avatarImage = homePage.querySelector('.home-header-avatar')
var changeUserAvatarForm = homePage.querySelector('.change-user-avatar-form')
var changeUserPasswordForm = homePage.querySelector('.change-user-password-form')
var homeMenu = homePage.querySelector('.home-menu')

loginForm.addEventListener('submit', function (event) {
  event.preventDefault()

  var email = event.target.email.value
  var password = event.target.password.value

  try {
   
      authenticateUser(email, password)
      authenticatedUserEmail = email
      var user = retrieveUser(email)

      homePage.querySelector('.hello-user-name').innerHTML = user.name;
      
      loginPage.classList.add("off");
      homePage.classList.remove("off")

      loginForm.reset()
  } catch (error) {
    alert(error.message)
  }
})

loginPage.querySelector('p a').onclick = function (event) {
  loginPage.classList.add("off");
  registerPage.classList.remove("off");
}

registerPage.querySelector('form').onsubmit = function (event) {
  event.preventDefault()
  var name = registerPage.querySelector('input.name').value
  var email = registerPage.querySelector('input.email').value
  var password = registerPage.querySelector('input.password').value
  try{
    registerUser(name, email, password)
    
    registerPage.classList.add("off");
    homePage.classList.remove("off");
  } catch (error) {
    alert(error.message)
}
}

registerPage.querySelector('p a').onclick = function (event) {
  registerPage.classList.add("off");
  loginPage.classList.remove("off");
}


changeUserPasswordForm.onsubmit = function (event) {
  event.preventDefault()
  var password = event.target.password.value
  var newPassword = homePage.querySelector('input[name="newPassword"]').value
  var newPasswordConfirm = homePage.querySelector('input[name="newPasswordConfirm"]').value
try {
  updateUserPassword(authenticatedUserEmail,password, newPassword, newPasswordConfirm)
} catch (error) {
  alert(error.message)
}
  console.log({ password }, { newPassword }, { newPasswordConfirm });
}


changeUserAvatarForm.onsubmit = function (event) {
  event.preventDefault()

    /* NOTE
    var url0 = event.target.url.value
    var url1 = updateUserAvatarForm.url.value
    var url2 = this.url.value

    console.log(url0, url1, url2)
    */

    var url = event.target.url.value

    try {
        updateUserAvatar(authenticatedEmail, url)

        alert('avatar updated')

        avatarImage.src = url
    } catch (error) {
        alert(error.message)
    }

}

homePage.querySelector('.home-header .menu-open').onclick = function (event) {
  event.preventDefault()
  show(homeMenu)
}

homeMenu.querySelector('.menu-close').onclick = function (event) {
  event.preventDefault()
  console.log('CLOSEEEEE');
  hide(homeMenu)
}

homeMenu.querySelector('.menu-logout').onclick =
  function () {
    event.preventDefault()
    hide(homePage, homePage, registerPage)
    show(loginPage)
  }