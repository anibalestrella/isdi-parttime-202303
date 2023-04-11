console.log('// LOGIC // updateUserAvatar');

import {findUserById} from "./helpers/data-managers.js"
import { validateId, validateUrl } from "./helpers/validators.js"


export function updateUserAvatar(userId, avatar) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')
  
    const foundUser = findUserById(userId)
  
    if (!foundUser)
      throw new Error('user not found')
  
    foundUser.avatar = avatar
  }
  