console.log('/// COMPONENTS / add post panel')

import { createPost } from "../logic/create-post.js"
import { context, hide } from "../ui.js"


export default function initAddPostPanel(appBody, renderPosts) {
    
    const addPostPanel = document.querySelector('.add-post-panel')
    const addPostPanelForm = addPostPanel.querySelector('.add-post-panel-form')

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

    return {addPostPanel}
}