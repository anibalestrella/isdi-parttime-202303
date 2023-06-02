import { findUserById, findPostById, savePosts, loadPosts, } from "../data";
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

        })
    })


}