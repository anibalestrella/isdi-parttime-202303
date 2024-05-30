const {
    User,
    Event,
    Place,
    EventReview,
} = require('../../../data-project/models')


module.exports = async function cleanUp() {
    await Promise.all([User.deleteMany(), Avatar.deleteMany()])
}

module.exports = async function cleanUp() {
    await Promise.all([

        User.deleteMany(),
        Event.deleteMany(),
        Place.deleteMany(),
        EventReview.deleteMany(),
    ])
    console.log('>>> cleanup!!!')
}