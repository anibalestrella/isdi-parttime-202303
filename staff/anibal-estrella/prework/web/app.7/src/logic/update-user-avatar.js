console.log('// LOGIC // updateUserAvatar');

import {findUserById} from "./helpers/data-managers.js"
import { validateId, validateUrl } from "./helpers/validators.js"
import { saveUsers } from "../data.js"

export function updateUserAvatar(userId, url) {
    validateId(userId, 'user id')
    validateUrl(url, 'avatar url')
  
    const user = findUserById(userId)
  
    if (!user)
      throw new Error('user not found')
  
    user.avatar = url

    saveUsers()
  }
  