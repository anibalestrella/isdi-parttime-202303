require('dotenv').config()
const updateUserAvatar = require('../updateUserAvatar')
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

function getRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
}
const randomNumber = getRandomNumber();
const userId = '64aac25c9ef4ef79ca75b01a'
const userId2 = '64aa892fae321e180c2c6402'
const avatar = `https://static01.nyt.com/images/2022/02/06/magazine/06mag-talk-l/06mag-talk-l-jumbo.jpg`
const avatar2 = `https://static.wikia.nocookie.net/swfanon/images/d/d8/Luke-promopicture.jpg/revision/latest?cb=20100516123000`

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        updateUserAvatar(userId, avatar)
        // updateUserAvatar(userId2, avatar2)
    )
    .then(() => console.log('USER\'s AVATAR UPDATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)