import { findPostById } from "./helpers/dataManagers.js";
import { validateId } from "./helpers/validators.js";
import { users } from "../data.js"

export default function retrievePosts(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const found=users().some(user => user.id === userId)

    if (!found) throw new Error(`User ${userId} not found`)

    const post = findPostById(postId)
    
    if (!post) throw new Error(`Post ${postId} not found`)

    return post
}