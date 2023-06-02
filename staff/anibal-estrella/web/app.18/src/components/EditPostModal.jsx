import { context } from "../ui.js"
import { updatePost } from "../logic/updatePost.js"

export default function EditPostModal({ onCancelEditPost, onPostEdited }) {
  console.log('// EditPostModal -> RENDER')

  function handleCancelEditPost(event) {
    event.preventDefault()

    onCancelEditPost()
  }


  function handleEdited(event) {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value

    try {
      console.log('edit postttttttt')
      updatePost(context.userId, id, image, text)
      onPostEdited()

    } catch (error) {
      alert(error.message)
    }
  }

  return <section className="edit-post-modal">
    <h3 className="create-post-headline">Edit your post!</h3>
    <form action="" className="edit-post-modal-form panel" onSubmit={handleEdited}>
      <label htmlfor="edit-post-image">Image:</label>
      <input type="url" name="image" placeholder="Paste image URL in here." />
      <label htmlfor="edit-post-text">Text:</label>
      <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here."></textarea>
      <div className="inline-container">
        <button className="create">create</button>
        <button className="cancel" onClick={handleCancelEditPost}>cancel</button>
      </div>
    </form>
    <div className="overlay-panel-close"></div>
  </section>

}