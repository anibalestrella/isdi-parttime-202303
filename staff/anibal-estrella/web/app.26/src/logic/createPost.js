import { validateId, validateUrl, validateText, validateCallback } from "./helpers/validators.js"
import { findUserById, loadPosts, savePosts } from "../data.js"


export function createPost(userId, image, text, callback) {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text, 'text')
    validateCallback(callback, 'callback function')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User ${userId} not found`))
            return
        }

        let id = 'post-01'

        loadPosts(posts => {
            const lastPost = posts[posts.length - 1]

            if (lastPost)
                id = 'post-0' + (parseInt(lastPost.id.slice(6)) + 1)

            const post = {
                id,
                author: userId,
                image,
                text,
                date: new Date,
                likes: [],
                visibility: 'public'
            }

            posts.push(post)

            savePosts(posts, () => callback(null))
        })

    })

}