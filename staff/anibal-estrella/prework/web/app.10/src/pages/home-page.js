console.log('// home-page')

import { context, show, hide } from "../ui.js"
import { updateUserPassword } from "../logic/update-user-password.js"
import { updatePost } from "../logic/update-post.js"
import { registerPage } from "./register-page.js"
import { loginPage } from "./login-page.js"
import { retrievePosts } from "../logic/retrieve-posts.js"
import retrieveUser from "../logic/retrieve-user.js"
import { createPost } from "../logic/create-post.js"
import { users } from "../data.js"
import { toggleLikePost } from "../logic/toggle-like-post.js"

import { updateUserEmail } from "../logic/update-user-email.js"
import { updateUserAvatar } from '../logic/update-user-avatar.js'

export const homePage = document.querySelector(".home")

const appBody = document.querySelector('body')

const homeMenu = homePage.querySelector('.home-menu')
const homeProfile = homePage.querySelector('.home-profile')
const changeUserPasswordForm = homePage.querySelector('.change-user-password-form')
const changeUserEmailForm = homePage.querySelector('.change-user-email-form')

const changeUserAvatarForm = homePage.querySelector('.change-user-avatar-form')
const avatarImage = homePage.querySelectorAll('.user-avatar')
const avatarImageLink = homePage.querySelectorAll('.home-profile-avatar-link')
const DEFAULT_AVATAR_URL = '../../assets/avatar-default.svg'
const headerTitleLink = homePage.querySelector('.header-title-link')

export const postListPanel = homePage.querySelector('.post-list')
export const homeFooter = document.querySelector('.home-footer')

const addPostPanel = document.querySelector('.add-post-panel')
const addPostPanelForm = document.querySelector('.add-post-panel-form')

const editPostPanel = document.querySelector('.edit-post-panel')
const editPostPanelForm = document.querySelector('.edit-post-panel-form')

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

headerTitleLink.onclick = (event) => {
  hide(homeProfile)
  show(postListPanel)
}



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

  hide(homePage, homePage, registerPage, homeProfile)
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

  appBody.classList.add('block-scroll')

  hide(homeMenu)
  show(addPostPanel)
}

homeFooter.querySelector('.add-post-button').onclick = function (event) {
  event.preventDefault()

  appBody.classList.add('block-scroll')
  show(addPostPanel)
}


editPostPanelForm.onsubmit = event => {
  event.preventDefault()

  const user = context.userId

  const postId = event.target.postId.value
  const image = event.target.image.value
  const text = event.target.text.value

  try {
    //createPost(context.userId, image, text)
    console.log({ postId }, { image }, { text }, { user })
    //TODO updatePost{context.userID, postID, image, text}
    updatePost(user, postId, image, text)

    hide(editPostPanel)

    appBody.classList.remove('block-scroll')

    renderPosts()
  } catch (error) {
    alert(error.message)
  }

  editPostPanelForm.reset()
}

editPostPanelForm.querySelector('.cancel').onclick = function (event) {
  event.preventDefault()

  appBody.classList.remove('block-scroll')
  hide(editPostPanel)
  editPostPanelForm.reset()
}

export function renderPosts() {

  //empty the posts
  postListPanel.innerHTML = ''

  try {
    const posts = retrievePosts(context.userId)
    posts.forEach(post => {

      // IMPERATIVE WAY
      const postItem = document.createElement('article')
      postItem.classList.add("post", "panel");

      const author = users.find(element => element.id === post.author)

      const authorName = document.createElement('h3')
      authorName.innerText = author.name

      const authorAvatar = document.createElement('img')
      authorAvatar.classList = 'user-avatar home-post-avatar'
      authorAvatar.src = author.avatar ?  author.avatar : DEFAULT_AVATAR_URL


      const date = document.createElement('time')
      date.innerText = post.date.toLocaleDateString()

      const image = document.createElement('img')
      image.classList = 'home-post-image'
      image.src = post.image

      const text = document.createElement('p')
      text.innerText = post.text


      if (post.author === context.userId) {
        const editPostButton = document.createElement('button')
        editPostButton.innerText = 'Edit Post'

        //add onclick listener
        editPostButton.onclick = () => {

          editPostPanelForm.querySelector('input[type=url]').value = post.image
          editPostPanelForm.querySelector('input[type=hidden]').value = post.id
          editPostPanelForm.querySelector('textarea').value = post.text

          show(editPostPanel)

        }

        postItem.append(authorAvatar, authorName, date, image, text, editPostButton)

      } else {
        postItem.append(authorAvatar, authorName, date, image, text)

      }

      const likeButton = document.createElement('button')
      likeButton.innerText = post.likes && post.likes.includes(context.userId) ? `❤️ ${post.likes.length}` : `🤍 ${post.likes && post.likes.length || 0}`

      likeButton.onclick = () => {
        try {
          toggleLikePost(context.userId, post.id)

          renderPosts()
        } catch (error) {
          alert(error.message)
        }
      }

      postItem.appendChild(likeButton)

      postListPanel.appendChild(postItem)

      // DECLARATIVE WAY
      //   postListPanel.innerHTML = posts.reduce((accum, post) => {
      //     return accum + `<article class="post">
      //     <p>${post.author}</p>
      //         ${post.author === context.userId ? '<button>Edit</button>' : ''}
      //     <date>${post.date.toLocaleString()}</date>
      //       <img src="${post.image}" alt="">
      //       <p>${post.text}</p>
      //     </article>`}, '')
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

  const image = addPostPanelForm.querySelector('input[name="image"]').value
  const text = addPostPanelForm.querySelector('textarea[name="text"]').value

  try {
    createPost(context.userId, image, text)

    hide(addPostPanel)
    appBody.classList.remove('block-scroll')

    renderPosts()
  } catch (error) {
    alert(error.message)
  }

  addPostPanelForm.reset()
}

addPostPanelForm.querySelector('.cancel').onclick = function (event) {
  event.preventDefault()
  appBody.classList.remove('block-scroll')

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