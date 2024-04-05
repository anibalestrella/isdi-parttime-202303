//UPDATE USER PROFILE
const {
    errors: { ExistenceError, ContentError },
    validators: { validateEmail, validateId } } = require('com')

const { User } = require('../data-project/models')

/**
 * 
 * @param {*} userId 
 * @param {*} userNewEmail 
 * @param {*} userNewEmailConfirm 
 * @returns 
 */

module.exports = (userId, userNewEmail, userNewEmailConfirm) => {

    validateId(userId, 'user id')
    validateEmail(userNewEmail, 'Email')
    validateEmail(userNewEmailConfirm, 'Email')

    if (userNewEmail !== userNewEmailConfirm) throw new ExistenceError(`the new Emails confirmation doesn't match`)

    return (async () => {
        const user = await User.findOne({ email })
        if (!user) throw new ExistenceError('user not found')

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new AuthError('wrong credentials');
        }

    })()

    return Promise.all([
        User.findById(userId, 'Email').lean(),

    ]).then(([user]) => {
        if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
        if (userNewEmail === user.Email) throw new ExistenceError(`new Email must be different from old one`)

        return User.updateOne(
            { _id: userId },
            {
                email: userNewEmail,
            })
    })
        .then(() => { })
}

