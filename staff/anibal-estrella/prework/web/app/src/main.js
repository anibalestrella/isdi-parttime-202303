// ESTA ES LA CAPA De PRESENTACION
// SOLO IMPORTA LÓGICA
// NO EXPORTA NADA
console.log('//// MAIN');

import {show,hide} from "./ui.js"
import {registerUser,authenticateUser,updateUserPassword,updateUserAvatar,retrieveUser} from "./logic.js"

let name;
let authenticatedUserId;

const registerPage = document.querySelector(".register")
const registerForm = registerPage.querySelector('form')

const DEFAULT_AVATAR_URL = 'https://i.stack.imgur.com/gdlU5.png?s=192&g=1'
const loginPage = document.querySelector(".login")
const loginForm = loginPage.querySelector('form')


const homePage = document.querySelector(".home")
const avatarImage = homePage.querySelector('.home-header-avatar')
const changeUserAvatarForm = homePage.querySelector('.change-user-avatar-form')
const changeUserPasswordForm = homePage.querySelector('.change-user-password-form')
const changeUserEmailForm = homePage.querySelector('.change-user-email-form')

const homeMenu = homePage.querySelector('.home-menu')

loginForm.onsubmit = function (event) {
  event.preventDefault()

  const email = event.target.email.value
  const password = event.target.password.value

  try {
    authenticatedUserId = authenticateUser(email, password)
      const user = retrieveUser(authenticatedUserId)
      
      homePage.querySelector('.hello-user-name').innerHTML = user.name;
      
      if (user.avatar)
      avatarImage.src = user.avatar

      loginForm.reset()

      hide(loginPage)
      show(homePage)

  } catch (error) {
    alert(error.message)
  }
}

loginPage.querySelector('p a').onclick = function (event) {
  loginPage.classList.add("off");
  registerPage.classList.remove("off");
}

registerForm.onsubmit = function (event) {
  event.preventDefault()
  const name = event.target.name.value
  const email = event.target.email.value
  const password = event.target.password.value
  try{
    registerUser(name, email, password)
          loginForm.reset()
          homePage.querySelector('.hello-user-name').innerHTML = name;

    hide(registerPage)
    show(homePage)
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
  updateUserPassword(authenticatedUserId,password, newPassword, newPasswordConfirm)
} catch (error) {
  alert(error.message)
}
  console.log({ password }, { newPassword }, { newPasswordConfirm });
}

changeUserEmailForm.onsubmit = function (event) {
  event.preventDefault()
  var password = event.target.password.value
  var newPassword = homePage.querySelector('input[name="newPassword"]').value
  var newPasswordConfirm = homePage.querySelector('input[name="newPasswordConfirm"]').value
try {
  updateUserPassword(authenticatedUserId,password, newPassword, newPasswordConfirm)
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
    avatarImage.src = DEFAULT_AVATAR_URL;
    hide(homeMenu, homePage, homePage, registerPage)
    show(loginPage)
  }