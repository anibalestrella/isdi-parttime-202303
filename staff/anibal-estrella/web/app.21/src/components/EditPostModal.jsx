import { useState, useRef } from 'react';

import { context } from "../ui.js"
import { updatePost } from "../logic/updatePost.js"
import retrievePost from "../logic/retrievePost.js"
import deletePost from "../logic/deletePost.js"
import "./EditPostModal.css"

import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from '@heroicons/react/24/solid'




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
      updatePost(context.userId, postId, image, text)

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
        deletePost(context.userId, postId); // Invoke deletePost when the button is clicked
        onDeletedPost()
      }

    } catch (error) {
      alert(error.message)
    }

  };

  //try 
  let _image;
  let _text;

  try {
    const { image, text } = retrievePost(context.userId, postId)
    _image = image
    _text = text
  } catch (error) {
    alert(error.message)
  }

  const imageInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState(_image);

  const handleImagePreview = (event) => {
    event.preventDefault()

    setPreviewImage(imageInputRef.current.value);
  }


  return <section className="edit-post-modal">

    <h3 className="modal-post-headline">Edit your post!</h3>

    <form action="" className="edit-post-modal-form panel" onSubmit={handleEditPost}>

      <label htmlFor="edit-post-image ">Image:</label>
      <img src={previewImage} alt="" className="edit-post-th grayscale-img" alt="Preview" />

      <div className='modal-actions-container'>
        <input type="url" name="image" placeholder="Paste image URL in here." defaultValue={previewImage} ref={imageInputRef} />
        <button className="preview-image-button icon" onClick={handleImagePreview}>Preview<EyeIcon className="eye icon" /></button>
      </div>

      <label htmlFor="edit-post-text ">Text:</label>

      <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here." defaultValue={_text}></textarea>

      <div className="modal-actions-container">

        <button className="save icon" type="submit">Save <CheckIcon className="save icon" /> </button>
        <button className="delete icon" onClick={handleDeletePost}>Delete <TrashIcon className="delete icon" /></button>
        <button className="cancel icon" onClick={handleCancel}>Cancel<ArrowSmallLeftIcon className="cancel icon" /></button>

      </div>

    </form>

    <div className="overlay-panel-close" onClick={handleCancel}></div>

  </section>

}