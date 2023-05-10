import { validateId, validateUrl, validateText } from '../helper/validators.js'

export function updatePost(userId, postId, image, text) {
    validateUrl(image, 'user id')
    validateId()

    const user = finddUserId(userId)

    // - verify post exists
    const post = finsPostById(postId)

    if (!user) throw new Error(`User ${userId} not found`)

    // - verify that the post belongs to user
    if (post.author !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

    // - modify post with new data
    post.image = image 
    post.text = text
    post.date = new Date

    //- save posts
    savePosts()
}