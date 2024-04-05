require('dotenv').config()

const mongoose = require('mongoose')
const retrieveUser = require('./retrieveUser')
const { User } = require('../data-project/models')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => retrieveUser('64df9391d29be9c2e470eb91'))
    .catch(error => console.error(error))
    .then(console.log())
    .finally(() => mongoose.disconnect)


