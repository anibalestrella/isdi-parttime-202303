console.log('// LOGIC // createPost');


import { validateId, va } from "./helpers/validators.js" 
imprt { posts } from './data.js'

export default function createPost(userId, image, text){
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    //TODO steps
    //check user with userId exixts
    //create post id
    //create post object and add authe, image, text, and date
    // add post to posts array in  Db


}