import { validateCallback, validateId } from "./helpers/validators.js";
import { findUserById, loadPosts } from "../data.js"

export default function retrievePosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback, 'callback')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User ${userId} not found`))

            return
        }
        loadPosts(posts => {

            // antes de enviar los posts, agregamos una propiedad si el user tiene un fav para enviar mas informacion a la capa de presentaccion sin manipular la BDD
            posts.forEach( post => post.fav = user.favs.includes(post.id));
            callback(null, posts.toReversed())
        })
    })
}