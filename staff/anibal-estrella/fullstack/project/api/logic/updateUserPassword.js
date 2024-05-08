const bcrypt = require('bcryptjs');
const {
    errors: { ExistenceError, ContentError },
    validators: { validatePassword, validateId } } = require('com')

const { User } = require('../data-project/models.js')

/**
 * 
 * @param {*} userCurrentPassword 
 * @param {*} userNewPassword 
 * @param {*} userNewPasswordConfirm 
 * @returns 
 */

module.exports = (userId, userCurrentPassword, userNewPassword, userNewPasswordConfirm) => {
    validatePassword(userCurrentPassword, 'Current Password')
    validatePassword(userNewPassword, 'New password')
    validatePassword(userNewPasswordConfirm, 'Password confirmation')

    if (userNewPassword !== userNewPasswordConfirm) throw new ExistenceError(`the new passwords doesn't match confirmation`);

    return User.findById(userId, 'password')
        .then(user => {
            if (!user) throw new ExistenceError(`The user id not found in the DB`);

            return bcrypt.compare(userCurrentPassword, user.password)
                .then(passwordsMatch => {
                    if (!passwordsMatch) throw new ExistenceError(`Password mismatch with DB`);

                    return bcrypt.hash(userNewPassword, 10);
                })
                .then(hashedNewPassword => {
                    if (userCurrentPassword === userNewPassword) throw new ExistenceError(`New password must be different from the old one`);

                    return User.updateOne(
                        { _id: userId },
                        {
                            password: hashedNewPassword,
                        }
                    );
                });
        });
};
