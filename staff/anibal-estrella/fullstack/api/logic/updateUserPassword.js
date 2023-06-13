const { readFile, writeFile } = require('fs')
const { validators: { validateId, validatePassword, validateCallback } } = require('com')


module.exports = (userId, password, newPassword, newPasswordConfirm, previousPassword, callback) => {
    validateId(userId, 'user Id')
    validatePassword(password, 'password')
    validatePassword(newPassword, 'new Password')
    validatePassword(newPasswordConfirm, 'new Password Confirm')
    validatePassword(previousPassword, 'previous Password Confirm')
    validateCallback(callback)

    if (previousPassword === newPassword) throw new Error(
        `New password must be different as previous password`
    )
    if (newPassword !== newPasswordConfirm) throw new Error(`New passwords don't match.`)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        if (user.password !== previousPassword) {
            callback(new Error(`Password is incorrect! 👎`))

            return
        }

        user.password = newPassword
        const json2 = JSON.stringify(users, null, 4)

        writeFile(`${process.env.DB_PATH}/users.json`, json2, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)

        })

    })

}