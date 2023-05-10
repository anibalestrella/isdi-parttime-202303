import { context } from "../ui.js"
import { createPost } from "../logic/createPost.js"

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

    return <section className="add-post-modal">
        <h3 className="create-post-headline">Shoot your post!</h3>
        <form action="" className="add-post-modal-form panel" onSubmit={handleCreatePost}>
            <label htmlFor="add-post-image">Image:</label>
            <input type="url" name="image" placeholder="Paste image URL in here." />
            <label htmlFor="add-post-text">Text:</label>
            <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here."></textarea>
            <div className="inline-container">
                <button className="create">create</button>
                <button className="cancel" onClick={handleCancel}>cancel</button>
            </div>
        </form>
        <div className="overlay-panel-close"></div>
    </section>

}