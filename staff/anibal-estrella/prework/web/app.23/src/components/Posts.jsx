import { useState, useEffect } from "react"
import { context } from "../ui"

import retrievePosts from "../logic/retrievePosts"
import retrieveUser from "../logic/retrieveUser"

import Post from "./Post.jsx"

export default function Posts({ onEditPost, lastPostsUpdate, user, onRefreshPosts }) {

    const [posts, setPosts] = useState()
    const [_user, setUser] = useState()

    useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = () => {
        try {
            retrievePosts(context.userId, (error, posts) => {
                if (error) {
                    alert(error.message)
                    return
                }
                setPosts(posts)
                onRefreshPosts()
            })

            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)
                    return
                }
                setUser(_user)
            })

        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log('Posts -> component will liseten for props changes using Hooks');

        if (lastPostsUpdate)
            handleRefreshPosts()
    }, [lastPostsUpdate]

    )

    console.log('// Posts -> RENDER');

    return <section className="post-list border-top-gradient">
        <h2 className="post-list-headline">All Posts</h2>

        {posts && posts.map(post => <Post 
            key={post.id}
            post={post}
            user={user}
            onEditPost={onEditPost}
            onDeletedPost={handleRefreshPosts}
            onToggledLikePost={handleRefreshPosts}
            onToggledFavPost={handleRefreshPosts}
            onPostEdited={handleRefreshPosts}
        />)}

    </section>

}




