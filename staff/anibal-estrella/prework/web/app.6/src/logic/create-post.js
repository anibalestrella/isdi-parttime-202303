console.log('// LOGIC // createPost');


import { validateId, validateUrl, validateText } from "./helpers/validators.js" 
import { posts, savePosts } from "../data.js"
import { findUserById } from "./helpers/data-managers.js";


export function createPost(userId, image, text){
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    //TODO steps
    //check user with userId exixts
    //create post id
    //create post object and add authe, image, text, and date
    // add post to posts array in  Db


    const user = findUserById(userId)

    if (!user) throw new Error(`User ${userId} not found`)

    let id ='post-01'
    const lastPost = posts[postMessage.length -1]

    if (lastPost)
    id= 'post-0' + (parseInt(lastPost.id.slice(5)) + 1)

const post ={
    id,
    author: userId,
    image,
    text,
    date:new Date
}
posts.push(post)

savePosts()
}