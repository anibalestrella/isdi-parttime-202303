const updateUserName = require('../updateUserName')
require('dotenv').config()
const mongoose = require('mongoose')

const name = 'News User q s ert'
const userId = '66262b1f8c9321ce3a418922'
const userId2 = '660d2e140347beb258b49f6e'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        updateUserName(userId, name)
    )
    .then(() => console.log('USER\'s name succesfully UPDATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)