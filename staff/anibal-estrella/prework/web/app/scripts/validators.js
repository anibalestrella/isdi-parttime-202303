console.log('//// VALIDATORS');

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error(`${email} is not an email`)
    if (!email.trim().length) throw new Error('email is blank')
}

export function validatePassword(password, explain = "password") {
    if(!password) throw new Error(`${explain} is blank`)
    if (typeof password !== 'string') throw new Error(`${explain} must be a string`)
    if (password.trim().length < 2) throw new Error(`${explain} password must be more than 3 characters long`)
}

export function validateName(name) {
    if (name.length < 1) throw new Error('name must be longer than one character')
     if (typeof name !== 'string') throw new Error('name must be a string')
    if (!name.trim().length) throw new Error('name is blank')
}
export function validateUrl(url, explain = 'URL') {
    if (typeof url !== 'string') throw new Error('url must be a string')
    if (!url.trim().length) throw new Error(`${url}`)

    var foundUser = findUserByMail(email)
    foundUser.vatar = avatar
}