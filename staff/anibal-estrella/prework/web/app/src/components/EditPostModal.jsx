import { useState } from 'react';

import { context } from "../ui.js"
import { updatePost } from "../logic/updatePost.js"
import retrievePost from "../logic/retrievePost.js"
import deletePost from "../logic/deletePost.js"
import "./EditPostModal.css"

export default function EditPostModal({ onCancel, onPostEdited, postId, onDeletedPost }) {
  console.log('// EditPostModal -> RENDER')

  const [previewUrl, setPreviewUrl] = useState('');

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

  const handleInputChange = (event) => {
    const image = event.target.image.value    
      setPreviewUrl(image);
    
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

  const { image, text } = retrievePost(context.userId, postId)




    return <section className="edit-post-modal">

      <h3 className="create-post-headline">Edit your post!</h3>

      <form action="" className="edit-post-modal-form panel" onSubmit={handleEditPost}>

        <label htmlFor="edit-post-image">Image:</label>

        {previewUrl && <img src={image} alt="" className="edit-post-th grayscale-img" alt="Preview" />}

        <input type="url" name="image" placeholder="Paste image URL in here." defaultValue={image} onChange={handleInputChange}/>

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

}