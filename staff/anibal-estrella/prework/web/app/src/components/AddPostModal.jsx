import { context } from "../ui.js"
import { createPost } from "../logic/createPost.js"

import { useState, useRef } from 'react';

import "./AddPostModal.css"

export default function AddPostModal({ onCancel, onPostCreated }) {
    console.log('// AddPostModal -> RENDER')

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {

            createPost(context.userId, image, text)
            onPostCreated()

        } catch (error) {
            alert(error.message)
        }
    }

const emptyImage ="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs"
    const imageInputRef = useRef(null);
  
    const [previewImage, setPreviewImage] = useState(emptyImage);
  
    const handleImagePreview = (event) => {
      event.preventDefault()
  
      setPreviewImage( imageInputRef.current.value);
    }
  

    return <section className="add-post-modal">
        <h3 className="create-post-headline">Shoot your post!</h3>
        <form action="" className="add-post-modal-form panel" onSubmit={handleCreatePost}>

                <label htmlFor="add-post-image">Image:</label>
                <img src={previewImage} alt="" className="add-post-th grayscale-img" alt="Preview" />
            <div className='preview-image-container'>
                <input type="url" name="image" placeholder="Paste image URL in here." ref={imageInputRef}/>
                <button className="preview-image-button" onClick={handleImagePreview}>Preview</button>
            </div>

            <label htmlFor="add-post-text">Text:</label>
            <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here."></textarea>
            <div className="inline-container">
                <button className="create">create</button>
                <button className="cancel" onClick={handleCancel}>cancel</button>
            </div>
        </form>
        <div className="overlay-panel-close" onClick={handleCancel}></div>
    </section>

}