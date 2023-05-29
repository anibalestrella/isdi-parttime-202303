import { validateCallback, validateId } from "./helpers/validators.js";
import { findUserById, loadPosts, loadUsers } from "../data.js"

export default function retrieveLikedPosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback, 'callback function')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User ${userId} not found`))

            return
        }

        loadPosts(posts => {
            loadUsers(users => {
                posts.forEach(post => {

                    post.likes = post.likes.includes(user.id)

                    const _user = users.find(user => user.id === post.author)

                    post.author = {
                        id: _user.id,
                        name: _user.name,
                        avatar: _user.avatar
                    }
                })
                callback(null, posts.filter(post => post.likes.includes(user.id)).toReversed())
            })

        })
    })

}


