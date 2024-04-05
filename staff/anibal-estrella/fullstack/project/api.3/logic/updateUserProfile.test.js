const updateUserEmail = require('./updateUserEmail')
require('dotenv').config()
const mongoose = require('mongoose')

const email = 'updateUserEmail@example.com'
const userId = '64aac25c9ef4ef79ca75b01a'
const userId2 = '64aa892fae321e180c2c6402'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        updateUserEmail(userId, email, email)
    )
    .then(() => console.log('USER\'s email succesfully UPDATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)