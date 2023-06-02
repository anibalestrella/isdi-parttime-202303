// import { findUserById, findPostById, savePosts, loadPosts } from "../data.js";
import { findUserById, findPostById, savePosts, loadPosts, loadUsers, saveUsers } from "../data.js";
import { validateId, validateCallback } from "./helpers/validators"


export default function deletePost(userId, postId, callback) {
    validateId(userId, 'user ID')
    validateId(postId, 'post ID')
    validateCallback(callback, 'callback function')



    findUserById(userId, user => {
        if (!user) {
            callback(new Error('User not found'))

            return
        }

        findPostById(postId, post => {

            if (!post) {
                callback(new Error('Post ' + postId + ' not found'))
                return
            }

            if (post.author !== userId) {
                callback(new Error('Post with id ' + postId + ' not found does not belongs to user ' + userId))

                return
            }

            loadPosts(posts => {
                const index = posts.findIndex(post => post.id === postId)

                posts.splice(index, 1)

                savePosts(posts, () => callback(null))

            })

            loadUsers(users => {users.forEach((user) => {
                const index = user.favs.indexOf(postId);

                if (index !== -1) {
                    user.favs.splice(index, 1);
                    saveUsers(users, () => callback(null))
                }
            })}
            )
    

    })
})


}