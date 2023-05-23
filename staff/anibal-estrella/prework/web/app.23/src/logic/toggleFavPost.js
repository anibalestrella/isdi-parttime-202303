import { validateId, validateCallback } from './helpers/validators.js'
import { findUserById, findPostById, saveUser } from '../data.js'


export default function toggleFavPost(userId, postId, callback) {
    validateId(postId, 'post id')
    validateId(userId, 'user id')
    validateCallback(callback, 'callback function')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User ${userId} not found`))
            return
        }


        // - verify post exists
        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`Post ${postId} not found`))
                return
            }
            const index = user.favs.indexOf(postId)

            if (index < 0)
                user.favs.push(postId)
            else
                user.favs.splice(index, 1)

            saveUser(user, () => callback(null))
        })
    })
}
