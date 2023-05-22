import { validateId, validateCallback } from './helpers/validators'
import { users, posts } from '../data'

export default function retrievePosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback, 'callback function')


    const user = users().find(user => user.id === userId)

    if(!user) throw new Error ('User id not valid') 

    return posts().filter(post => user.savedPosts.includes(post.id)).toReversed()
}