import { useState, useEffect } from "react"
import { context } from "../ui"

import retrievePosts from "../logic/retrievePosts"
import retrieveSavedPosts from "../logic/retrieveSavedPosts"
import retrieveUser from "../logic/retrieveUser"

import Post from "./Post.jsx"

export default function Posts({ onEditPost, lastPostsUpdate, onOpenSavedPosts, user }) {

    const [posts, setPosts] = useState()

    const [_user, setUser] = useState()

    useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = (view) => {

        try {

            if (view === 'saved-posts' ) {
                retrieveSavedPosts(context.userId, (error, posts) => {
                    if (error) {
                        alert(error.message)
                        return
                    }
                    setPosts(posts)
                })

            }else            
                retrievePosts(context.userId, (error, posts) => {
                    if (error) {
                        alert(error.message)
                        return
                    }
                    setPosts(posts)
                })
            
                console.debug('// Posts -> RENDER');


            retrieveUser(context.userId, (error, _user) => {
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
        console.debug('Posts -> component will listen for props changes using Hooks');

        if (lastPostsUpdate)
            handleRefreshPosts()

        if (onOpenSavedPosts){
            handleRefreshPosts(onOpenSavedPosts)
        }

    }, [lastPostsUpdate, onOpenSavedPosts]

    )


    return <section className="post-list border-top-gradient">
        {/* <h2 className="post-list-headline">All Posts</h2> */}

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




