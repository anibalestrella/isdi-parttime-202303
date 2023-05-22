import { validateId, validateCallback } from "./helpers/validators.js"
import { findUserById } from "../data.js"

export default function retrieveUser(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback, 'callback function')


    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))
            
            return
        }

         user = {
            name: user.name,
            avatar: user.avatar
        }

        callback(null, user)

    })

}
