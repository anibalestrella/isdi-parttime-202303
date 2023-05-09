import { context } from "../ui"
import Post from "./Post.jsx"
import retrievePosts from "../logic/retrievePosts"
import retrieveUser from "../logic/retrieveUser"

export default function Posts({ onEditPost }) {
    console.log('// Posts -> RENDER');

    function handleEditPost(postId) {
        onEditPost(postId)
    }

    try {

        const posts = retrievePosts(context.userId)
        const user = retrieveUser(context.userId)

        return (
            <section className="post-list">
                <h2 className="post-list-headline">All Posts</h2>

                //we pass the onEditPost  function as a callback directly without using a handler... function.
                {posts.map(post => <Post post={post}
                    user={user}
                    onEditPost={handleEditPost}
                    // onEditPost={onEditPost} we can use it like this so we avois using handleEditPost
                />)}
            </section>
        )

    } catch (error) {
        alert(error.message)
    }

}
