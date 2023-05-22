import { validateId, validateCallback } from './helpers/validators.js'
import { findUserById, findPostById, savePost } from '../data.js'


export default function toggleLikePost(userId, postId, callback) {
    validateId(postId, 'post id')
    validateId(userId, 'user id')
    validateCallback(callback, 'callback function')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User ${userId} not found`))
            return
        }

    })

    // - verify post exists
    findPostById(postId, post => {
        if (!post) {
            callback(new Error(`Post ${postId} not found`))
            return
        }

        if (!post.likes) {
            post.likes = [userId]
        } else {
            const index = post.likes.indexOf(userId)
            if (index < 0)
                // If user index is -1(userId not in array) add it to LIKE
                post.likes.push(userId)
            else {
                // take userId out of array to UNLIKE post
                post.likes.splice(index, 1)
                if (!post.likes.length) delete post.likes
            }
        }

        savePost(post, () => callback(null))
    })
}

// trick to test it with the app loaded and acces function through the window memory
window.toggleLikePost = toggleLikePost