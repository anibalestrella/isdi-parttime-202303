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
// envío solo iinformacion del usuario, lo que lo identifica y caracteriza, nada de sus acciones (favs, likes, etc)
         const _user = {
            name: user.name,
            avatar: user.avatar,
        }

        callback(null, _user)

    })

}
