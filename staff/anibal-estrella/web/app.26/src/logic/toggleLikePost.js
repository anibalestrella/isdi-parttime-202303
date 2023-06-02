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

        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`Post ${postId} not found`))
                return
            }

            const index = post.likes.indexOf(userId)

            if (index < 0)
                post.likes.push(userId)
            else
                post.likes.splice(index, 1)

            savePost(post, () => callback(null))
        })
    })
}
