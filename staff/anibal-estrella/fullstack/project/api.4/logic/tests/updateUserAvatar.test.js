require('dotenv').config()
const updateUserAvatar = require('../updateUserAvatar')
const mongoose = require('mongoose')
const { User } = require('../../data-project/models')

function getRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
}
const randomNumber = getRandomNumber();
const userId = '66311663c3d375081f6ecd48'
const userId2 = '64aa892fae321e180c2c6402'
const avatar = `https://ik.imagekit.io/7viapifcc/tr:n-ik_ml_thumbnail/astro_jkmM_e01G`
const avatar2 = `https://static.wikia.nocookie.net/swfanon/images/d/d8/Luke-promopicture.jpg/revision/latest?cb=20100516123000`

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        updateUserAvatar(userId, avatar)
        // updateUserAvatar(userId2, avatar2)
    )
    .then(() => console.log('USER\'s AVATAR UPDATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)