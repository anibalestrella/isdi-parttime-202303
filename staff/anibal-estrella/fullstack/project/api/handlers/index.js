const jwt = require('jsonwebtoken')

module.exports = {
    helloApiHandler: require('./helloApiHandler'),
    registerUserHandler: require('./registerUserHandler'),
    authenticateUserEmailHandler: require('./authenticateUserEmailHandler'),
    authenticateUserHandler: require('./authenticateUserHandler'),
    retrieveUserHandler: require('./retrieveUserHandler'),
    uploadMediaHandler: require('./uploadMediaHandler'),
    createEventHandler: require('./createEventHandler'),
    updateUserNameHandler: require('./updateUserNameHandler'),
    updateUserNickNameHandler: require('./updateUserNickNameHandler'),
    updateUserPasswordHandler: require('./updateUserPasswordHandler'),
    updateUserAvatarHandler: require('./updateUserAvatarHandler'),
    addArtistHandler: require('./addArtistHandler')

}