const updateUserNickName = require('../updateUserNickName')
require('dotenv').config()
const mongoose = require('mongoose')

const nickName = 'asdsssd'
const userId = '66262b1f8c9321ce3a419922'
const userId2 = '660d2e140347beb258b49f6e'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        updateUserNickName(userId, nickName)
    )
    .then(() => console.log('USER\'s nickName succesfully UPDATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)