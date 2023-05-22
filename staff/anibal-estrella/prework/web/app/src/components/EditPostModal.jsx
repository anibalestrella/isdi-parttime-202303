import { useState, useEffect, useRef } from 'react';

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
    const [post, setPost] = useState(null)
    
    useEffect(() => {
        try {
            retrievePost(context.userId, postId, (error, post) => {
                if (error) {
                    alert(error.message)
    
                    return
                }
                //saleve loaded post
                setPost(post)
                
            })
            
        } catch (error) {
            alert(error.message)
        }
        
    }, [postId])

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleEditPost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost(context.userId, postId, image, text, (error) => {
                if (error) {
                    alert(error.message)
    
                    return
                }
                onPostEdited()
            })


        } catch (error) {
            alert(error.message)
        }
    }


    const handleDeletePost = (event) => {
        event.preventDefault()

        try {
            const answer = confirm('Do you really want to delete this post?')

            if (answer) {
                deletePost(context.userId, postId, error => {
                    if (error) {
                        alert(error.message)

                        return
                    }

                    onDeletedPost()
                })
            }

        } catch (error) {
        }

    };


    

    //lets FIX the preview image
    const imageInputRef = useRef();
    const [previewImage, setPreviewImage] = useState(post);
    

    const handleImagePreview = (event) => {
        event.preventDefault()
        console.log(">>>>> "+previewImage);
        setPreviewImage(imageInputRef.current.value);
    }
    
    console.log('// EditPostModal -> RENDER')
    
    return <>
        {post && <section className="edit-post-modal">

            <h3 className="modal-post-headline">Edit your post!</h3>

            <form action="" className="edit-post-modal-form panel" onSubmit={handleEditPost}>

                <label htmlFor="edit-post-image " className='border-top-gradient'>Image:</label>
                {/* <img src={previewImage} alt="" className="edit-post-th grayscale-img" alt="Preview" />

                <div className='modal-actions-container'>
                    <input className='input-preview' type="url" name="image" placeholder="Paste image URL in here."
                    defaultValue={previewImage} ref={imageInputRef} />

                    <button className="preview-image-button icon post-button"
                    onClick={handleImagePreview}>Preview<EyeIcon className="eye icon" /></button>
                </div> */}
                
                 <img src={previewImage} className="edit-post-th grayscale-img" alt="Preview" />

                <div className='modal-actions-container'>
                    <input className='input-preview' type="url" name="image" placeholder="Paste image URL in here."
                    defaultValue={post.image} ref={imageInputRef}/>
                    <button className="preview-image-button icon post-button" onClick={handleImagePreview}>Preview<EyeIcon className="eye icon" /></button>
                </div>

                <label htmlFor="edit-post-text ">Text:</label>

                <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here." defaultValue={post.text}></textarea>

                <div className="modal-actions-container border-top-gradient">

                    <button className="delete post-button icon" onClick={handleDeletePost}>Delete <TrashIcon className="delete icon" /></button>
                    <button className="cancel post-button icon" onClick={handleCancel}>Cancel<ArrowSmallLeftIcon className="cancel icon" /></button>
                    <button className="save post-button icon" type="submit">Save <CheckIcon className="save icon" /> </button>

                </div>

            </form>

            <div className="overlay-panel-close" onClick={handleCancel}></div>

        </section>}
    </>

}