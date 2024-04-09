import { validators } from 'com'
import loginUser from './loginUser'

const { validateToken, validateEmail, validateCallback, validateName, validateNickName, validatePassword } = validators

/**
 * 
 */

export default (token, name, nickName, email, password, newEmail, newEmailConfirm, userNewPassword, userNewPasswordConfirm, callback) => {
    validateToken(token)
    validateEmail(email, 'Email')
    newEmail !== email ? (validateEmail(newEmail, 'new Email'), validateEmail(newEmailConfirm, 'Email')) : null;


    validateName(name, 'name')
    validateNickName(nickName, 'nickname')
    validateEmail(password, 'password')
    validatePassword(userNewPassword, 'New Password')
    validatePassword(userNewPasswordConfirm, 'New Password Confirmation')

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

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/user-update-profile/`)

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        const data = {
            name: name,
            nickName: nickName,
            newEmail: newEmail,
            newEmailConfirm: newEmailConfirm,
            password: userNewPassword
        }

        const json = JSON.stringify(data)

        xhr.send(json)
        return
    }

    try {
        loginUser(email, password);
    } catch (error) {
        throw new Error('Authentication failed. Please check your credentials.');
    }

    return fetch(`${import.meta.env.VITE_API_URL}/Users/user-update-profile/`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Email }),
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

