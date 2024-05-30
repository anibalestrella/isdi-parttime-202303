const bcrypt = require('bcryptjs');
const {
    errors: { ExistenceError, ContentError },
    validators: { validatePassword, validateId } } = require('com')

const { User } = require('../data-project/models.js')

/**
 * 
 * @param {*} userNewPassword 
 * @param {*} userNewPasswordConfirm 
 * @returns 
 */

module.exports = (userId, userNewPassword, userNewPasswordConfirm) => {
    validateId(userId, 'userId')
    validatePassword(userNewPassword, 'New password')
    validatePassword(userNewPasswordConfirm, 'Password confirmation')

    if (userNewPassword !== userNewPasswordConfirm) throw new ExistenceError(`the new passwords doesn't match confirmation`);

    return User.findById(userId, 'password')
        .then(user => {
            if (!user) throw new ExistenceError(`The user id not found in the DB`);

            return bcrypt.compare(userNewPassword, user.password)
                .then(passwordsMatch => {
                    if (passwordsMatch) throw new ExistenceError(`New password must be different from the old one`);

                    return bcrypt.hash(userNewPassword, 10);
                })
                .then(hashedNewPassword => {

                    return User.updateOne(
                        { _id: userId },
                        {
                            password: hashedNewPassword,
                        }
                    );
                });
        });
};
