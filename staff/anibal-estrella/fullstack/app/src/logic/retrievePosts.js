import { validators } from 'com'
const { validateCallback, validateToken } = validators

export default (token, callback) => {
    validateToken(token, 'token')
    validateCallback(callback, 'callback')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }
        const { response: json } = xhr
        const posts = JSON.parse(json)
        callback(null, posts)
    }

    xhr.onerror = () => {
        callback(new Error('Connection Error!'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}