import { validateId } from './helpers/validators'
import { users, posts } from '../data'

export default function retrievePosts(userId) {
    validateId(userId, 'user id')

    const user = users().find(user => user.id === userId)

    if(!user) throw new Error ('User id not valid') 

    return posts().filter(post => user.savedPosts.includes(post.id)).toReversed()
}