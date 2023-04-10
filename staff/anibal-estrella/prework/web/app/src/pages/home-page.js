console.log('// home-page')

import { context, show, hide } from "../ui.js"
import {updateUserPassword} from "../logic/update-user-password.js"
import {updateUserAvatar} from '../logic/update-user-avatar.js'
import {updateUserEmail } from "../logic/update-user-email.js"
import { registerPage } from "./register-page.js"
import { loginPage } from "./login-page.js"


export const homePage = document.querySelector(".home")
const avatarImage = homePage.querySelector('.home-header-avatar')
const changeUserAvatarForm = homePage.querySelector('.change-user-avatar-form')
const changeUserPasswordForm = homePage.querySelector('.change-user-password-form')
const changeUserEmailForm = homePage.querySelector('.change-user-email-form')

const homeMenu = homePage.querySelector('.home-menu')

const DEFAULT_AVATAR_URL = 'https://i.stack.imgur.com/gdlU5.png?s=192&g=1'

changeUserPasswordForm.onsubmit = function (event) {
  event.preventDefault()
  var password = event.target.password.value
  var newPassword = homePage.querySelector('input[name="newPassword"]').value
  var newPasswordConfirm = homePage.querySelector('input[name="newPasswordConfirm"]').value
  try {
    updateUserPassword(context.userId, password, newPassword, newPasswordConfirm)
  } catch (error) {
    alert(error.message)
  }
  console.log({ password }, { newPassword }, { newPasswordConfirm });
}

changeUserEmailForm.onsubmit = function (event) {
  event.preventDefault()
  var newEmail = event.target.newEmail.value
  var newEmailConfirm = homePage.querySelector('input[name="newEmailConfirm"]').value
  const userId = context.userId
  try {
    updateUserEmail(userId, newEmail, newEmailConfirm)
  } catch (error) {
    alert(error.message)
  }
  changeUserEmailForm.reset()

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
    updateUserAvatar(context.userId, url)

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

    context.userId = null
    avatarImage.src = DEFAULT_AVATAR_URL;

    hide(homeMenu, homePage, homePage, registerPage)
    show(loginPage)
  }