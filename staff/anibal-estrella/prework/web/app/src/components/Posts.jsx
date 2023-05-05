import { context } from "../ui"
import { posts } from "../data"
import { post } from "./Post"
import retrievePosts from "../logic/retrievePosts"


export default function Posts(props) {
    console.log('// Posts -> RENDER');


    try {

        const posts = retrievePosts(context.userId)

        return <section className="post-list">
            <h2 className="post-list-headline">All Posts</h2>
            {posts.map(post => <Post post={post} />)}
        </section>


    } catch (error) {
        alert(error.message)
    }

}
