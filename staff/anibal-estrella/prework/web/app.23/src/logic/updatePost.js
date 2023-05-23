import { validateId, validateUrl, validateText, validateCallback } from './helpers/validators.js'
import { findUserById, findPostById, savePost } from '../data.js'

export function updatePost(userId, postId, image, text, callback) {
    validateUrl(image, 'image url')
    validateText(text, 'text')
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback, 'callback function')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User ${userId} not found`))

            return
        }
    })

    findPostById(postId, post => {
        if (!post) {
            callback(new Error(`Post ${postId} not found`))

            return
        }
        if (post.author !== userId) {
            callback(new Error(`post with id ${postId} does not belong to user with id ${userId}`))

            return
        }

        post.image = image
        post.text = text
        post.date = new Date

        savePost(post, () => callback(null))
    })
}
