console.log('// login-page' )

import { authenticateUser, retrieveUser } from "../logic.js"
import { context, show, hide } from "../ui.js"
import { registerPage } from "./register-page.js"
import { homePage } from "./home-page.js"

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
  hide(loginPage);
  show(registerPage);
}