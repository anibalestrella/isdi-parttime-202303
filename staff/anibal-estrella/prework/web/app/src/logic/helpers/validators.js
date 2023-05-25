console.debug('LOADED > validators.js')

/**
 * Validates an email
 * @param {string} email an email
 */

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error(`${email} is not an email`)
    if (!email.trim().length) throw new Error('email is blank')
}

/**
 * validates a password
 * @param {string} password the password
 * @param {string} explain alternative edescription in case of error
 */
export function validatePassword(password, explain = "password") {
    if(!password) throw new Error(`${explain} is blank`)
    if (typeof password !== 'string') throw new Error(`${explain} must be a string`)
    if (password.trim().length < 2) throw new Error(`${explain} password must be more than 3 characters long`)
}

/**
 * calidates a name
 * @param {string} name the name
 */
export function validateName(name) {
    if (name.length < 1) throw new Error('name must be longer than one character')
     if (typeof name !== 'string') throw new Error('name must be a string')
    if (!name.trim().length) throw new Error('name is blank')
}

/**
 * 
 * @param {string} url an URL
 * @param {string} explain alternative edescription in case of error
 */
export function validateUrl(url, explain = 'URL') {
    if (typeof url !== 'string') throw new Error('url must be a string')
    if (!url.trim().length) throw new Error(`${url} is empty`)
}

export function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new Error(`id is ${typeof id} and must be a string`)
    if (!id.trim().length) throw new Error(`${id} is empty`)
}

export function validateText(text) {
    if (text.length < 1) throw new Error('text must be longer than one character')
     if (typeof text !== 'string') throw new Error('text must be a string')
    if (!text.trim().length) throw new Error('text is blank')
}

export function validateCallback(callback, explain ="callback") {
    if (typeof callback != 'function') throw new Error( `${explain} must be a function`)
}