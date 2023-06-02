console.log('/// toggle-like-post');

import { validateId } from './helpers/validators.js'
import { findUserById, findPostById } from './helpers/dataManagers.js'
import { savePost } from '../data.js'


export function toggleLikePost(userId, postId) {
    validateId(postId, 'post id')
    validateId(userId, 'user id')


    const user = findUserById(userId)
    if (!user) throw new Error(`User ${userId} not found`)

    // - verify post exists
    const post = findPostById(postId)
    if (!post) throw new Error(`Post ${postId} not found`)

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

    savePost(post)
}

// trick to test it with the app loaded and acces function through the window memory
window.toggleLikePost = toggleLikePost