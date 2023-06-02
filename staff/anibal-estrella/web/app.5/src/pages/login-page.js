console.log('// login-page')

import { authenticateUser } from '../logic/authenticate-user.js'
import { retrieveUser } from "../logic/retrieve-user.js"
import { context, show, hide } from "../ui.js"
import { registerPage } from "./register-page.js"
import { homePage, homeFooter, renderPosts, avatarImage, DEFAULT_AVATAR_URL } from "./home-page.js"

export const loginPage = document.querySelector(".login")
const loginForm = loginPage.querySelector('form')

loginForm.onsubmit = function (event) {
  event.preventDefault()

  const email = event.target.email.value
  const password = event.target.password.value

  try {
    context.userId = authenticateUser(email, password)
    const user = retrieveUser(context.userId)

    homePage.querySelector('.hello-user-name').innerHTML = user.name;

    avatarImage.src = user.avatar ? avatarImage.forEach((image) => image.src = user.avatar) : avatarImage.forEach((image) => image.src = DEFAULT_AVATAR_URL)

    loginForm.reset()

    hide(loginPage)

    renderPosts()

    show(homePage)

  } catch (error) {
    alert(error.message)
  }
}

loginPage.querySelector('p a').onclick = function (event) {
  hide(loginPage);
  show(registerPage);
}