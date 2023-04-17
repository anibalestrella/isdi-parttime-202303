console.log('// home-page')

import { context, show, hide } from "../ui.js"
import { updateUserPassword } from "../logic/update-user-password.js"
import { registerPage } from "./register-page.js"
import { loginPage } from "./login-page.js"
import { retrievePosts } from "../logic/retrieve-posts.js"
import { retrieveUser } from "../logic/retrieve-user.js"
import { createPost } from "../logic/create-post.js"


import { updateUserEmail } from "../logic/update-user-email.js"
import { updateUserAvatar } from '../logic/update-user-avatar.js'

export const homePage = document.querySelector(".home")

const homeMenu = homePage.querySelector('.home-menu')
const homeProfile = homePage.querySelector('.home-profile')
const changeUserPasswordForm = homePage.querySelector('.change-user-password-form')
const changeUserEmailForm = homePage.querySelector('.change-user-email-form')

const changeUserAvatarForm = homePage.querySelector('.change-user-avatar-form')
const avatarImage = homePage.querySelectorAll('.user-avatar')
const avatarImageLink = homePage.querySelectorAll('.home-profile-avatar-link')
const DEFAULT_AVATAR_URL = '../../assets/avatar-default.svg'

export const postListPanel = homePage.querySelector('.post-list-panel')
export const homeFooter = document.querySelector('.home-footer')

const addPostPanel = document.querySelector('.add-post-panel')
const addPostPanelForm = document.querySelector('.add-post-panel-form')


changeUserPasswordForm.onsubmit = function (event) {
  event.preventDefault()

  const password = event.target.password.value
  const newPassword = homePage.querySelector('input[name="newPassword"]').value
  const newPasswordConfirm = homePage.querySelector('input[name="newPasswordConfirm"]').value

  try {

    updateUserPassword(context.userId, password, newPassword, newPasswordConfirm)

    alert('password changed')

    changeUserPasswordForm.reset()
  } catch (error) {
    alert(error.message)
  }
}

changeUserEmailForm.onsubmit = function (event) {
  event.preventDefault()

  const newEmail = event.target.newEmail.value
  const newEmailConfirm = homePage.querySelector('input[name="newEmailConfirm"]').value
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

  const url = event.target.url.value

  try {
    updateUserAvatar(context.userId, url)

    alert('avatar updated')

    avatarImage.forEach((image) => image.src = url)

    changeUserAvatarForm.reset()
  } catch (error) {
    alert(error.message)
  }

}

avatarImageLink.forEach(link => {
  link.addEventListener('click', () => {
    hide(postListPanel)
    show(homeProfile)
  });
});



homePage.querySelector('.home-header .menu-open').onclick = (event) => {
  event.preventDefault()
  show(homeMenu)
}



homeMenu.querySelector('.menu-close').onclick = function (event) {
  event.preventDefault()
  
  avatarImage.src = DEFAULT_AVATAR_URL
  hide(homeMenu)
}

homeMenu.querySelector('.menu-logout').onclick = function (event) {
  event.preventDefault()

  delete context.userId

  hide(homeMenu)

  avatarImage.forEach((image) => image.src = DEFAULT_AVATAR_URL)

  hide(homePage, homePage, registerPage,homeProfile)
  show(loginPage)
}

homeMenu.querySelector('.menu-profile').onclick = function (event) {
  event.preventDefault()

  hide(homeMenu, postListPanel)
  show(homeProfile)
}

homeMenu.querySelector('.menu-show-posts').onclick = function (event) {
  event.preventDefault()
  hide(homeMenu, homeProfile)
  show(postListPanel)
}

homeMenu.querySelector('.menu-create-post').onclick = function (event) {
  event.preventDefault()
  hide(homeMenu)
  show(addPostPanel)
}

homeFooter.querySelector('.add-post-button').onclick = function (event) {
  event.preventDefault()
  show(addPostPanel)
}

export function renderPosts() {

  //empty the posts
  postListPanel.innerHTML = ''

  try {
    const posts = retrievePosts(context.userId)
    posts.forEach(post => {
      // IMPERATIVE WAY
      // const postItem = document.createElement('article')
      // const image = document.createElement('img')
      // const title = document.createElement('h3')
      // const text = document.createElement('p')
      // const date = document.createElement('time')

      // date.innerText = post.date.toLocaleDateString()

      // postItem.appendChild(image, title, text, date)

      // DECLARATIVE WAY
      postListPanel.innerHTML = posts.reduce((accum, post) => {
        return accum + `<article class="post">
        <p>${post.author}</p>
        <date>${post.date.toLocaleString()}</date>
          <img src="${post.image}" alt="">
          <p>${post.text}</p>
        </article>`}, '')
    })

    return true
  } catch (error) {
    alert(error.message)

    return false
  }
}
addPostPanelForm.querySelector('.create').onclick = function (event) {
  event.preventDefault()
console.log('shitty post!!');
  const user = context.userId

  const image =  addPostPanelForm.querySelector('input[name="image"]').value
  const text = addPostPanelForm.querySelector('textarea[name="text"]').value
  
  try {
    createPost(context.userId, image, text)

    hide(addPostPanel)

    renderPosts()
} catch (error) {
    alert(error.message)
}

  addPostPanelForm.reset()
}

addPostPanelForm.querySelector('.cancel').onclick = function (event) {
  event.preventDefault()
  hide(addPostPanel)
  addPostPanelForm.reset()
}

document.querySelector('.overlay-panel-close').onclick = function (event) {
  hide(addPostPanel)
}

export function renderUser() {

  try {
    const user = retrieveUser(context.userId)
    homePage.querySelector('.hello-user-name').innerHTML = user.name;

    avatarImage.src = user.avatar ? avatarImage.forEach((image) => image.src = user.avatar) : avatarImage.forEach((image) => image.src = DEFAULT_AVATAR_URL)
    return true
  } catch (error) {
    alert(error.message)
    return false
  }

}