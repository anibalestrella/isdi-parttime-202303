console.log('// login-page')

import { registerPage } from "./register-page.js"
import { homePage, renderPosts, postListPanel, renderUser } from "./home-page.js"

export const loginPage = document.querySelector(".login")
const loginForm = loginPage.querySelector('form')



loginPage.querySelector('p a').onclick = function (event) {
  hide(loginPage);
  show(registerPage);
}