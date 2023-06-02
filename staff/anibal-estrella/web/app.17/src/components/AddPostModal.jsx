import { createPost } from "../logic/createPost.js"
import { context } from "../ui.js"

export default function AddPostModal({ onCancel }) {

    function handleCancel(event){
            event.preventDefault()

            onCancel()
    }

    return 	<section className="add-post-modal">
    <h3 className="create-post-headline">Shoot your post!</h3>
    <form action="" className="add-post-modal-form panel">
        <label for="add-post-image">Image:</label>
        <input type="url" name="image" placeholder="Paste image URL in here." />
        <label for="add-post-text">Text:</label>
        <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here."></textarea>
        <div className="inline-container">
            <button className="create">create</button>
            <button className="cancel" onClick={handleCancel}>cancel</button>
        </div>
    </form>
    <div className="overlay-panel-close"></div>
</section>

}