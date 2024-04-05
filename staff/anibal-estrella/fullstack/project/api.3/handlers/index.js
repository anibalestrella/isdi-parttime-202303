const jwt = require('jsonwebtoken')

module.exports = {
    helloApiHandler: require('./helloApiHandler'),
    registerUserHandler: require('./registerUserHandler'),
    authenticateUserEmailHandler: require('./authenticateUserEmailHandler'),
    authenticateUserHandler: require('./authenticateUserHandler'),
    retrieveUserHandler: require('./retrieveUserHandler'),
    uploadMediaHandler: require('./uploadMediaHandler'),
    createEventHandler: require('./createEventHandler'),
    updateUserProfileHandler: require('./updateUserProfileHandler'),
    addArtistHandler: require('./addArtistHandler')
}