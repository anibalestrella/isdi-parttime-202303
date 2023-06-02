import { validateCallback, validateId } from "./helpers/validators.js";
import { findUserById, loadPosts, loadUsers } from "../data.js"

export default function retrievePosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback, 'callback')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User ${userId} not found`))

            return
        }

        // antes de enviar los posts, agregamos una propiedad si el user tiene un fav para enviar mas informacion a la capa de presentaccion sin manipular la BDD
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
                callback(null, posts.toReversed())
            })

        })
    })

}