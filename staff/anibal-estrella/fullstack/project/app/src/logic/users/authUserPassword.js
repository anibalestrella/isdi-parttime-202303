import { validators, errors } from 'com'
import context from '../context'

const { validatePassword } = validators

/***
 * validates a user's password 
 * @param {string} password The user's password
 * @returns {string} The user's id
 ***/

export default (password) => {
    validatePassword(password)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        })

        if (res.status === 200) {
            return true
        }

        const { type, error } = await res.json()

        const errorClass = errors[type]

        throw new errorClass(error)
    })()

}