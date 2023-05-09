import { posts, savePosts, saveUsers, users } from "../data";
import { findUserById } from "./helpers/dataManagers";

export default function deletePost(userId, postId){
    const user = findUserById(userId)
    if(!user) throw new Error('User not found')

    const _posts = posts()
    const postIndex = _posts.findIndex(post => post.id === postId)
    _posts.splice(postIndex, 1)

 savePosts(_posts)

    const _users = users()
    _users.forEach(user => {
        if (user.likes) {
            user.likes.includes(postId) &&
            user.likes.splice(user.likes.findIndex(elem => elem === postId), 1) 
        }
    })

    _users.forEach(user => {
        if (user.savedPosts) {
            user.savedPosts.includes(postId) &&
            user.savedPosts.splice(user.savedPosts.findIndex(elem => elem === postId), 1) 
        }
    })

    saveUsers(_users)
}