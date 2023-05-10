import { posts, savePosts, saveUsers, users } from "../data";
import { findUserById, findPostById } from "./helpers/dataManagers";

export default function deletePost(userId, postId){
    const user = findUserById(userId)
    
    if(!user) throw new Error('User not found')

    const post = findPostById(postId)

    if(!post) throw new Error('Post '+ postId +' not found')

    if(post.author !== userId) throw new Error('Post with id ' + postId + ' not found does not belongs to user '+ userId )

    const _posts = posts()

    const index = _posts.findIndex(post => post.id === postId)

    _posts.splice(index, 1)

 savePosts(_posts)

}