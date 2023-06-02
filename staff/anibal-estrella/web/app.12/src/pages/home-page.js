console.log('// home-page')

import { context, show, hide } from "../ui.js"

import { registerPage } from "./register-page.js"
import { loginPage } from "./login-page.js"
import { retrievePosts } from "../logic/retrieve-posts.js"
import retrieveUser from "../logic/retrieve-user.js"
import { users, posts } from "../data.js"
import { toggleLikePost } from "../logic/toggle-like-post.js"

// components
// call the profile component
import initHomeProfile from "../components/home-profile.js"
import initAddPostPanel from "../components/add-post-panel.js"  
import initEditPostPanel from "../components/edit-post-panel.js" 

export const homePage = document.querySelector(".home")
export const DEFAULT_AVATAR_URL = '../../assets/avatar-default.svg'
export const postListPanel = homePage.querySelector('.post-list')
export const homeFooter = document.querySelector('.home-footer')

const appBody = document.querySelector('body')
const homeMenu = homePage.querySelector('.home-menu')
const headerTitleLink = homePage.querySelector('.header-title-link')
const avatarImage = homePage.querySelectorAll('.user-avatar')
const avatarImageLink = homePage.querySelectorAll('.home-profile-avatar-link')






// initialize Components
// the profile component using destructuring
const { homeProfile } = initHomeProfile(homePage, avatarImage)
const { addPostPanel } = initAddPostPanel(appBody, renderPosts)
const {editPostPanel,editPostPanelForm} = initEditPostPanel (renderPosts,appBody)


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


export function renderPosts() {

  //empty the posts
  postListPanel.innerHTML = ''

  try {
    const posts = retrievePosts(context.userId)
    posts.forEach(post => {

      // IMPERATIVE WAY
      const postItem = document.createElement('article')
      postItem.classList.add("post", "panel");

      const author = users().find(element => element.id === post.author)

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
          appBody.classList.add('block-scroll')

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

document.querySelector('.overlay-panel-close').onclick = function (event) {
  appBody.classList.remove('block-scroll')

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