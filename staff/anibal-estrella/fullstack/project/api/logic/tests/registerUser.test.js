require('dotenv').config()

const mongoose = require('mongoose')
const registerUser = require('../registerUser')
const { User } = require('../../data-project/models')

const userNickName = 'eddiev';

mongoose.connect(process.env.MONGODB_URL)
    .then(() => mongoose.models.User.countDocuments())
    .then(count => {
        if (count > 0) {
            return mongoose.models.User.deleteMany({ email: userNickName });
        } else {
            console.log("Collection 'User' is already empty.");
            return Promise.resolve();
        }
    })
    .then(() => registerUser('Eddie Vedder', 'eddiev', 'eddiev@gmail.com', '12341234', 'barcelona', [41.9301, 2.2549]))
    .catch(error => console.error(error))
    .then(() => console.log("User successfully Created!"))
    .finally(() => mongoose.disconnect())
