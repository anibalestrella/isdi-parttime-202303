const context = require('../../context')

module.exports = () => {
    const {
        users,
        events,
        places,
        eventreviews,
    } = context

    // in series
    // return users.deleteMany()
    //     .then(() => posts.deleteMany())
    // in parallel (faster)
    return Promise.all([
        users.deleteMany(),
        events.deleteMany(),
        places.deleteMany(),
        eventreviews.deleteMany(),
        console.log('>>> cleanup!!!'),
    ])
}