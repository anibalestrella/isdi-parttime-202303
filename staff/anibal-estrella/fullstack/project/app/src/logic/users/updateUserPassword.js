import { validators } from 'com'
const { validateToken, validatePassword } = validators

export default async (token, password, newPassword, newPasswordConfirm) => {
    validateToken(token)

    if (newPassword !== newPasswordConfirm) {
        throw new Error('password confirmation mismatch')
    } else if (newUserName === newUserNameConfirm) {
        throw new Error('new password should not match old password')
    } else {
        validatePassword(password, 'password')
        validatePassword(newPassword, 'new password')

        try {

            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password, newPassword }),
            });

            if (res.status !== 201) {
                const { error } = await res.json();
                throw new Error(error);
            }
        } catch (error) {
            throw new Error('connection error');
        }
    }

}


/* with callback function

import { validators } from 'com'
const { validateToken, validatePassword, validateCallback } = validators



export default (token, password, newPassword, newPasswordConfirm, callback) => {
    validateToken(token)

    if (newPassword !== newPasswordConfirm) {
        throw new Error('password confirmation mismatch')
    } else {
        validatePassword(password, 'password')
        validatePassword(newPassword, 'password')
    }

    if (callback) {
        validateCallback(callback, 'callback function')

        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status } = xhr

            if (status !== 201) {
                const { response: json } = xhr
                const { error } = JSON.parse(json)

                callback(new Error(error))

                return
            }
            callback(null)
        }

        xhr.onerror = () => {
            callback(new Error('connection error'))
        }

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/password`)

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const data = {
            password: password,
            newPassword: newPassword,
            newPasswordConfirm: newPasswordConfirm
        }

        const json = JSON.stringify(data)

        xhr.send(json)
        return

    }

    return fetch(`${import.meta.env.VITE_API_URL}/Users/password`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
    }).then((res) => {
        if (res.status !== 201) {
            //return the json object
            return res.json().then(({ error: message }) => {
                throw new Error(message)
                    .then(() => { })
            })
        }
    })
        .then(() => { })

}
*/
/*   

import { validators } from 'com'
import { saveUser, findUserById } from '../data'

const { validatePassword, validateId, validateCallback } = validators

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    if (newPassword === password) throw new Error('new password equals old password')
    validatePassword(newPasswordConfirm, 'new password confirm')
if (newPassword !== newPasswordConfirm) throw new Error('password confirmation mismatch')
validateCallback(callback)

findUserById(userId, user => {
    if (!user) {
        callback(new Error('user not found'))
        
        return
    }
    
    if (password !== user.password) {
        callback(new Error('wrong password'))
        
        return
    }
    
    user.password = newPassword
    
    saveUser(user, () => callback(null))
})
}
*/