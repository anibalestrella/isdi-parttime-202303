function validateEmail(email) {
    if (typeof email !== 'string') throw new Error('email must be a string')
    if (email.trim().length) throw new Error('email is blank')
}

function validatePassword(password, explain = "new password") {
    if (typeof password !== 'string') throw new Error(`${explain} must be a string`)
    if (password.trim().length < 2) throw new Error('password is less than 3 characters')
}

function validateName(name) {
    if (typeof name !== 'string') throw new Error('name must be a string')
    if (!name.trim().length) throw new Error('name is blank')
}
function validateUrl(url, explain = 'URL') {
    if (typeof url !== 'string') throw new Error('url must be a string')
    if (!url.trim().length) throw new Error(`${url}`)

    var foundUser = findUserByMail(email)
    foundUser.vatar = avatar
}