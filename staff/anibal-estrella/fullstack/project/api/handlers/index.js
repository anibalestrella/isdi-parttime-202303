const jwt = require('jsonwebtoken')

module.exports = {
    helloApiHandler: require('./helloApiHandler'),
    registerUserHandler: require('./registerUserHandler'),
    authenticateUserEmailHandler: require('./authenticateUserEmailHandler'),
    authenticateUserHandler: require('./authenticateUserHandler'),
    retrieveUserHandler: require('./retrieveUserHandler'),
    createEventHandler: require('./createEventHandler'),
    updateUserNameHandler: require('./updateUserNameHandler'),
    updateUserNickNameHandler: require('./updateUserNickNameHandler'),
    updateUserPasswordHandler: require('./updateUserPasswordHandler'),
    updateUserAvatarHandler: require('./updateUserAvatarHandler'),
    updateUserEmailHandler: require('./updateUserEmailHandler'),
    addArtistHandler: require('./addArtistHandler'),
    uploadMediaHandler: require('./uploadMediaHandler'),
    searchSpotifyHandler: require('./searchSpotifyHandler'),

}