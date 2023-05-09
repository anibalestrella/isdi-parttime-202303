import { posts, savePosts, saveUsers, users } from "../data";
import { findUserById } from "./helpers/dataManagers";

export default function deletePost(userId, postId){
    const user = findUserById(userId)
    
    if(!user) throw new Error('User not found')

    const _posts = posts()

    const postIndex = _posts.findIndex(post => post.id === postId)

    _posts.splice(postIndex, 1)

 savePosts(_posts)

}