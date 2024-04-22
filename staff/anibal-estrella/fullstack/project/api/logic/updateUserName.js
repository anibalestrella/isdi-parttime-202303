const {
    errors: { ExistenceError, ContentError },
    validators: { validateName, validateId }
} = require('com')

const { User } = require('../data-project/models')
const bcrypt = require('bcryptjs')

/** 
 * UPDATE USER NAME
 *
 * @param {*} userId
 * @param {*} userNewName
 * @returns
 */

module.exports = async (userId, userNewName) => {
    validateId(userId, 'user id')
    validateName(userNewName, 'name')

    try {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError(`User with the id ${userId} not found`)

        // You need to implement proper password validation here

        if (userNewName === user.name) throw new ExistenceError('New name must be different from old one')

        await User.updateOne({ _id: userId }, { name: userNewName })
    } catch (error) {
        throw error
    }
}



// module.exports = (userId, userNewName) => {
//     debugger
//     validateId(userId, 'user id')
//     validatename(userNewName, 'name')


//     return (async () => {
//         const user = await User.findOne({ email })
//         if (!user) throw new ExistenceError('user not found')

//         const match = await bcrypt.compare(password, user.password)
//         if (!match) {
//             throw new AuthError('wrong credentials');
//         }

//     })()

//     return Promise.all([
//         User.findById(userId, 'name').lean(),

//     ]).then(([user]) => {
//         if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
//         if (userNewName === user.name) throw new ExistenceError(`new name must be different from old one`)

//         return User.updateOne(
//             { _id: userId },
//             {
//                 name: userNewName,
//             })
//     })
//         .then(() => { })
// }

