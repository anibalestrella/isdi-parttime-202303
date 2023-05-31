import { validateCallback, validateId } from "./helpers/validators.js";
import { findUserById, loadPosts, loadUsers } from "../data.js"

export default function retrievePosts(userId, callback) {
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

                    post.fav = user.favs.includes(post.id)

                    const _user = users.find(user => user.id === post.author)

                    post.author = {
                        id: _user.id,
                        name: _user.name,
                        avatar: _user.avatar
                    }
                })
                if (user.favs.length === 0)
                    callback(new Error(`${user.name}!\nYou don't have any fav post yet.`), null)
                else
                    callback(null, posts.filter(post => user.favs.includes(post.id)).toReversed())
            })

        })
    })

}


