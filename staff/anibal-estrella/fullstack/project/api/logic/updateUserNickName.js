const {
    errors: { ExistenceError, ContentError },
    validators: { validateNickName, validateId }
} = require('com')

const { User } = require('../data-project/models')
const bcrypt = require('bcryptjs')

/** 
 * UPDATE USER NAME
 *
 * @param {*} userId
 * @param {*} userNewNickName
 * @returns
 */

module.exports = async (userId, userNewNickName) => {
    validateId(userId, 'user id')
    validateNickName(userNewNickName, 'name')

    try {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError(`User with the id ${userId} not found`)

        // You need to implement proper password validation here

        if (userNewNickName === user.nickName) throw new ExistenceError('New nick name must be different from old one')

        await User.updateOne({ _id: userId }, { nickName: '@' + userNewNickName })
    } catch (error) {
        throw error
    }
}



// module.exports = (userId, userNewNickName) => {
//     debugger
//     validateId(userId, 'user id')
//     validatename(userNewNickName, 'name')


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
//         if (userNewNickName === user.name) throw new ExistenceError(`new name must be different from old one`)

//         return User.updateOne(
//             { _id: userId },
//             {
//                 name: userNewNickName,
//             })
//     })
//         .then(() => { })
// }

