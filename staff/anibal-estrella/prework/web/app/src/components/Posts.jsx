import { context } from "../ui"
import Post from "./Post.jsx"
import retrievePosts from "../logic/retrievePosts"
import retrieveUser from "../logic/retrieveUser"

export default function Posts(props) {
    console.log('// Posts -> RENDER');

    
    function handleOpenEditPostModal(){
        props.onOpenEditPostModal()
    }

    try {

        const posts = retrievePosts(context.userId)
        const user = retrieveUser(context.userId)

        return (
            <section className="post-list">
                <h2 className="post-list-headline">All Posts</h2>
                {/* converts all OBJECTS in React "Post" type React components <Post /> and sending Post as a PROP to Post <Post post={post}/>*/}
                {posts.map(post => <Post post= { post }
                user = { user }
                onEditPost = { handleOpenEditPostModal }
                 />)}
            </section>
        )

    } catch (error) {
        alert(error.message)
    }

}
