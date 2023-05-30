import { useState, useRef } from 'react';
import { useContext } from "react"

import { context } from "../ui.js"
import { createPost } from "../logic/createPost.js"

import Context from "../Context"

import Panel from '../library/Panel'

import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from '@heroicons/react/24/solid'


import "./AddPostModal.css"

export default function AddPostModal({ onCancel, onPostCreated }) {
    const { alert } = useContext(Context)

    const emptyImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs"
    
    const imageInputRef = useRef(null);
    
    const [previewImage, setPreviewImage] = useState(emptyImage);
    
    function handleCancel(event) {
        event.preventDefault()
        
        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value
        
        try {
            createPost(context.userId, image, text, error => {
                if (error) {
                    alert(error.message)
                    
                    return
                }
                onPostCreated()
            }) 

        } catch (error) {
            alert(error.message)
        }
    }
    
    
    const handleImagePreview = (event) => {
        event.preventDefault()

        setPreviewImage(imageInputRef.current.value);
    }
    
    console.debug('// AddPostModal -> RENDER')

    return <section className="add-post-modal">
        <h3 className="modal-post-headline">Shoot your post!</h3>

        <Panel tag="form" className="add-post-modal-form" onSubmit={handleCreatePost}>

            <label htmlFor="add-post-image" className="border-top-gradient">Your awesome pic:</label>
            <img src={previewImage} className="add-post-th grayscale-img" alt="Preview" />
            <div className='modal-actions-container'>
                <input type="url" name="image" className='input-preview' placeholder="Paste image URL in here." ref={imageInputRef} />
                <button className="preview-image-button icon post-button" onClick={handleImagePreview}>Preview<EyeIcon className="eye icon" /></button>
            </div>

            <label htmlFor="add-post-text" className="border-top-gradient">tell us something:</label>
            <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here."></textarea>
            <div className="modal-actions-container border-top-gradient">
                <button className="cancel post-button icon" onClick={handleCancel}>Cancel<ArrowSmallLeftIcon className="cancel icon" /></button>
                <button className="save post-button icon" type="submit">Save <CheckIcon className="save icon" /> </button>
            </div>

        </Panel>

        <div className="overlay-panel-close" onClick={handleCancel}></div>
    </section>

}