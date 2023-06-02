import { context } from "../ui.js"
import { updatePost } from "../logic/updatePost.js"
import retrievePost from "../logic/retrievePost.js"
import deletePost from "../logic/deletePost.js"

export default function EditPostModal({ onCancel, onPostEdited, postId, onDeletedPost }) {
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
      console.log('EDIT!!');

      updatePost(context.userId, postId, image, text)

      // close the modal when post saved
      onPostEdited()

    } catch (error) {
      alert(error.message)
    }
  }

  const handleDeletePost = (event) => {
    event.preventDefault()

    try {

      const answer = confirm('Do you really want to delete this post?')

      if (answer) {
        console.log('DELETE THE MOTHERFICKER!!!');
        deletePost(context.userId, postId); // Invoke deletePost when the button is clicked
        onDeletedPost()
      }

    } catch (error) {
      alert(error.message)
    }

  };

  try {

    const { image, text } = retrievePost(context.userId, postId)
    return <section className="edit-post-modal">

      <h3 className="create-post-headline">Edit your post!</h3>

      <form action="" className="edit-post-modal-form panel" onSubmit={handleEditPost}>

        <label htmlFor="edit-post-image">Image:</label>

        <img src={image} alt="" className="edit-post-th" width="200px" />

        <input type="url" name="image" placeholder="Paste image URL in here." defaultValue={image} />

        <label htmlFor="edit-post-text">Text:</label>

        <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here." defaultValue={text}></textarea>

        <div className="inline-container"> 

          <button className="save" type="submit">Save</button>
          <button className="delete" onClick={handleDeletePost}>Delete</button>
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