require('dotenv').config()

const mongoose = require('mongoose')
const authenticateUser = require('./authenticateUser')
const { User } = require('../data-project/models')

// mongoose.connect('mongodb://127.0.0.1:27017/data')
mongoose.connect(process.env.MONGODB_URL)
    .then(() => Promise.all([User.deleteMany()]))
    .then(() => authenticateUser('lucas@gmail.com', '123123123'))
    .then(console.log)
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect)
