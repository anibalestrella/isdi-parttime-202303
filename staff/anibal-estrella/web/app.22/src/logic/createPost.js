console.log('// LOGIC // createPost');


import { validateId, validateUrl, validateText } from "./helpers/validators.js"
import { posts, savePosts } from "../data.js"
import { findUserById } from "./helpers/dataManagers.js";


export function createPost(userId, image, text) {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    const user = findUserById(userId)

    if (!user) throw new Error(`User ${userId} not found`)

    let id = 'post-01'

    const _posts = posts()
    const lastPost = _posts[_posts.length - 1]

    if (lastPost)
        id = 'post-0' + (parseInt(lastPost.id.slice(6)) + 1)

    const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date
    }

    _posts.push(post)

    savePosts(_posts)
}