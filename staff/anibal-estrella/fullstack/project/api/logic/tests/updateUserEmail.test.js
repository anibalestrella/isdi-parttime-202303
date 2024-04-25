const updateUserEmail = require('../updateUserEmail')
require('dotenv').config()
const mongoose = require('mongoose')


const email = 'updateUserEmail@example.com'
const emailConfirm = 'updateUserEmail@example.com'
const userId = '6628c9e1844832ed4d382479'
const userId2 = '6628c9e1844832ed4d382477'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        updateUserEmail(userId, email, emailConfirm)
    )
    .then(() => console.log('USER\'s email succesfully UPDATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)