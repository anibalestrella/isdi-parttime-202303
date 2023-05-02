console.log('// register-page');

import {registerUser} from '../logic/register-user.js'
//import { context, show, hide } from "../ui.js"
import { show, hide } from "../ui.js"

import { loginPage} from './login-page.js'
import { homePage } from "./home-page.js"
// import { homePage, renderUser } from "./home-page.js"
//import { authenticateUser } from '../logic/authenticate-user.js'




export const registerPage = document.querySelector(".register")
const registerForm = registerPage.querySelector('form')

registerForm.onsubmit = function (event) {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value
    try{
      registerUser(name, email, password)
            registerForm.reset()
            

      hide(registerPage)
      //no se cargaba el usuario registrado
      //context.userId = authenticateUser(email, password)
      //renderUser()
      show(homePage)
    } catch (error) {
      alert(error.message)
  }

  }

  registerPage.querySelector('p a').onclick = function (event) {
    registerPage.classList.add("off");
    loginPage.classList.remove("off");
  }