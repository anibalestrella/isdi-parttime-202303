console.log('// LOGIC // updateUserAvatar');

import {findUserById} from "./helpers/dataManagers.js"
import { validateId, validateUrl } from "./helpers/validators.js"
import { saveUser } from "../data.js"

export default function updateUserAvatar(userId, url) {
    validateId(userId, 'user id')
    validateUrl(url, 'avatar url')
  
    const user = findUserById(userId)
  
    if (!user)
      throw new Error('user not found')
  
    user.avatar = url

    saveUser(user)
  }
  