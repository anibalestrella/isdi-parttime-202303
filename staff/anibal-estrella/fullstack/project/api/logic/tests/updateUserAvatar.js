const updateUserAvatar = require('../updateUserAvatar')
require('dotenv').config()
const mongoose = require('mongoose')

const avatar = 'https://www.univates.br/radio/media/noticias_responsivo/28879/-1605698998.9777_1440_900.jpg'
const userId = '66262b1f8c9321ce3a419922'
const userId2 = '660d2e140347beb258b49f6e'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        updateUserAvatar(userId, avatar)
    )
    .then(() => console.log('USER\'s avatar succesfully UPDATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)