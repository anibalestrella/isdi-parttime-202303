require('dotenv').config()

const mongoose = require('mongoose')
const authenticateUserEmail = require('../authenticateUserEmail')
const { User } = require('../../data-project/models')

mongoose.connect(process.env.MONGODB_URL)
    // .then(() => User.deleteMany())
    .then(() => authenticateUserEmail('santi@gmail.com'))
    .then(console.log)
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
