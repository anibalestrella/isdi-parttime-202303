console.log('/// COMPONENTS / edit post panel')

import { context, hide} from "../ui.js"
import { updatePost } from "../logic/update-post.js"

export default function(renderPosts,appBody){
    
    const editPostPanel = document.querySelector('.edit-post-panel')
    const editPostPanelForm = editPostPanel.querySelector('.edit-post-panel-form')

    editPostPanelForm.onsubmit = event => {
        event.preventDefault()
      
        const user = context.userId
      
        const postId = event.target.postId.value
        const image = event.target.image.value
        const text = event.target.text.value
      
        try {
          //createPost(context.userId, image, text)
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
      
return {editPostPanel,editPostPanelForm}
}