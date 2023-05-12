import { useState, useEffect } from "react"
import { context } from "../ui"

import retrievePosts from "../logic/retrievePosts"
import retrieveUser from "../logic/retrieveUser"

import Post from "./Post.jsx"

//we use a CLASS component to update the state an reload posts
export default function Posts({ onEditPost, lastPostsUpdate }) {

    let _posts
    let _user

    try {
        _posts = retrievePosts(context.userId)
        _user = retrieveUser(context.userId)
    } catch (error) {
        alert(error.message)
    }

    const [posts, setPosts] = useState(_posts)
    const [user, setUser] = useState(_user)

    const handleRefreshPosts = () => {
        try {
            const posts = retrievePosts(context.userId)
            const user = retrieveUser(context.userId)

            // we  Update the state with SETSTATE
            setPosts(posts)
            setUser(user)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log('Posts -> component will liseten for props changes using Hooks');
        handleRefreshPosts()
        // listen to lastupdate for any changes
    }, [lastPostsUpdate]

    )

    console.log('// Posts -> RENDER');

    return <section className="post-list">
        <h2 className="post-list-headline">All Posts</h2>

        {posts.map(post => <Post post={post}
            user={user}
            onEditPost={onEditPost}
            onDeletedPost={handleRefreshPosts}
            onToggledLikePost={handleRefreshPosts}
            onPostEdited={handleRefreshPosts}
        />)}
        
    </section>

}




