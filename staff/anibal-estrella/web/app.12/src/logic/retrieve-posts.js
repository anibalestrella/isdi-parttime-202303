console.log('// LOGIC // retrievePosts');

import { validateId } from "./helpers/validators.js";
import { users, posts } from "../data.js"

export function retrievePosts(userId) {
    validateId(userId, 'use id')

    const found=users().some(user => user.id === userId)

    if (!found) throw new Error(`User ${user} not found`)

    //call the posts() function with data.js to load the posts list with fresh posts from storage and reverse the order (to begin with the last posts)
    return posts().toReversed()
}