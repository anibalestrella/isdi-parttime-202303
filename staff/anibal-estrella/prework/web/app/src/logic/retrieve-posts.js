console.log('// LOGIC // retrievePosts');

import { validateId } from "./helpers/validators.js";
import { users, posts } from "../data.js"

export function retrievePosts(userId) {
    validateId(userId, 'use id')

    const found=users.some(user => user.id === userId)

    if (!found) throw new Error(`User ${user} not found`)

    return posts
}