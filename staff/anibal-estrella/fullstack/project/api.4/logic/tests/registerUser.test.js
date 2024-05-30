// node logic/tests/registerUser.test.js     

require('dotenv').config()

const mongoose = require('mongoose')
const { User, Event, EventReview, Place } = require('../../data-project/models')
const registerUser = require('../registerUser')

return (async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        await Promise.all([User.deleteMany(), Event.deleteMany(), EventReview.deleteMany(), Place.deleteMany()])

        await registerUser('artau @star', 'artau', 'artau@gmail.com', '12341234', 'Barcelona', [41.9301, 2.2549])

        console.log("User successfully Created!")
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.disconnect()
    }
})()