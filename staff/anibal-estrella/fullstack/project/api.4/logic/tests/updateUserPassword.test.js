const updateUserPassword = require('../updateUserPassword')
require('dotenv').config()
const mongoose = require('mongoose')

function getRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
}
const randomNumber = getRandomNumber();
const userId = '64aac25c9ef4ef79ca75b01a'
const userId2 = '64aa892fae321e180c2c6402'
const password = `234234234`
const newPassword = `asdfgsdfgsdf`
const newPasswordConfirm = `asdfgsdfgsdf`

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        updateUserPassword(userId, password, newPassword, newPasswordConfirm)
        // updateUserPassword(userId2, password2)
    )
    .then(() => console.log('USER\'s password UPDATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)