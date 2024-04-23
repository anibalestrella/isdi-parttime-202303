const bcrypt = require('bcryptjs');
const {
    errors: { ExistenceError, ContentError },
    validators: { validatePassword, validateId } } = require('com')

const { User, Post } = require('../data-project/models.js')

/**
 * 
 * @param {*} userId 
 * @param {*} password 
 * @param {*} newPassword 
 * @param {*} newPasswordConfirm 
 * @returns 
 */

module.exports = (userId, password, newPassword, newPasswordConfirm) => {

    validateId(userId, 'user id')
    validatePassword(password, 'password')
    validatePassword(newPassword, 'password')
    validatePassword(newPasswordConfirm, 'password')

    if (newPassword !== newPasswordConfirm) throw new ExistenceError(`the new passwords confirmation doesn't match`);

    return User.findById(userId, 'password')
        .then(user => {
            if (!user) throw new ExistenceError(`The user id not found in the DB`);

            // Compare hashed passwords
            return bcrypt.compare(password, user.password)
                .then(passwordsMatch => {
                    if (!passwordsMatch) throw new ExistenceError(`Password mismatch with DB`);

                    // Hash the new password
                    return bcrypt.hash(newPassword, 10);
                })
                .then(hashedNewPassword => {
                    if (password === newPassword) throw new ExistenceError(`New password must be different from the old one`);

                    return User.updateOne(
                        { _id: userId },
                        {
                            password: hashedNewPassword,
                        }
                    );
                });
        });
};
