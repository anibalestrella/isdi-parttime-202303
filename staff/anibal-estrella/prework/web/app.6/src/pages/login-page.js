console.log('// login-page')

import { authenticateUser } from '../logic/authenticate-user.js'
import { context, show, hide } from "../ui.js"
import { registerPage } from "./register-page.js"
import { homePage, renderPosts, postListPanel, renderUser } from "./home-page.js"

export const loginPage = document.querySelector(".login")
const loginForm = loginPage.querySelector('form')

loginForm.onsubmit = function (event) {
  event.preventDefault()

  const email = event.target.email.value
  const password = event.target.password.value

  try {
    context.userId = authenticateUser(email, password)

    renderUser()
    renderPosts()

    loginForm.reset()

    hide(loginPage)


    show(homePage, postListPanel)

  } catch (error) {
    alert(error.message)
  }
}

loginPage.querySelector('p a').onclick = function (event) {
  hide(loginPage);
  show(registerPage);
}