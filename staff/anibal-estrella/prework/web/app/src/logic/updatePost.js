import { validateId, validateUrl, validateText } from './helpers/validators.js'
import { findUserById, findPostById } from './helpers/dataManagers.js'
import { savePost } from '../data.js'

export function updatePost(userId, postId, image, text) {
    validateUrl(image, 'image url')
    validateText(text, 'text')
    validateId(userId, 'user id')
    validateId(postId, 'post id')


    const user = findUserById(userId)
    if (!user) throw new Error(`User ${userId} not found`)

    // - verify post exists
    const post = findPostById(postId)
    if (!post) throw new Error(`Post ${postId} not found`)


    // - verify that the post belongs to user
    if (post.author !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

    // - modify post with new data
    post.image = image
    post.text = text
    post.date = new Date

    //- save post
    savePost(post)
}