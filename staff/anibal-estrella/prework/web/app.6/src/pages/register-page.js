console.log('// register-page');

import {registerUser} from '../logic/register-user.js'
import { show, hide } from "../ui.js"
import { loginPage} from './login-page.js'
import { homePage } from "./home-page.js"



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