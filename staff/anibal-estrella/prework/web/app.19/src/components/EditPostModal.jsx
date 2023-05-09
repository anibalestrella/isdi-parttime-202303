import { context } from "../ui.js"
import { updatePost } from "../logic/updatePost.js"
import retrievePost from "../logic/retrievePost.js"

export default function EditPostModal({ onCancel, onPostEdited, postId }) {
  console.log('// EditPostModal -> RENDER')
  
  
  function handleCancel(event) {
    event.preventDefault()

    onCancel()
  }

  function handleEditPost(event) {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value

    try {

      updatePost(context.userId, postId, image, text)

      // close the modal when post saved
      onPostEdited()

    } catch (error) {
      alert(error.message)
    }
  }


  try {

    const { image, text } = retrievePost(context.userId, postId)

    return <section className="edit-post-modal">
      <h3 className="create-post-headline">Edit your post!</h3>
      <form action="" className="edit-post-modal-form panel" onSubmit={handleEditPost}>
        <label htmlFor="edit-post-image">Image:</label>
        <img src={image} alt="" className="edit-post-th" width="200px"/>
        <input type="url" name="image" placeholder="Paste image URL in here." defaultValue={image} />
        <label htmlFor="edit-post-text">Text:</label>
        <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here." defaultValue={text}></textarea>
        <div className="inline-container">
          <button className="save">Save</button>
          <button className="delete">Delete</button>

          <button className="cancel" onClick={handleCancel}>cancel</button>

        </div>
      </form>
      <div className="overlay-panel-close"></div>
    </section>
  } catch (error) {
    alert(error.message)
    
    return null
  }
}