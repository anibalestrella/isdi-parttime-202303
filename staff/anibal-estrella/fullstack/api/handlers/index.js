const jwt = require('jsonwebtoken')

module.exports = {
    helloApiHandler: require('./helloApiHandler'),
    registerUserHandler: require('./registerUserHandler'),
    authenticateUserHandler: require('./authenticateUserHandler'),
    retrieveUserHandler: require('./retrieveUserHandler'),
    createPostHandler: require('./createPostHandler'),
    retrievePostHandler: require('./retrievePostHandler'),
    retrievePostsHandler: require('./retrievePostsHandler'),
    updateUserPasswordHandler: require('./updateUserPasswordHandler'),
    updateUserNameHandler: require('./updateUserNameHandler'),
    updateUserAvatarHandler: require('./updateUserAvatarHandler'),
    updateUserEmailHandler: require('./updateUserEmailHandler'),
    deletePostHandler: require('./deletePostHandler'),
    updatePostHandler: require('./updatePostHandler'),
    toggleLikePostHandler: require('./toggleLikePostsHandler'),
    toggleFavPostHandler: require('./toggleFavPostsHandler'),
    retrieveLikedPostsHandler: require('./retrieveLikedPostsHandler'),
    retrieveFavPostsHandler: require('./retrieveFavPostsHandler'),
    addCommentToPostHandler: require('./addCommentToPostHandler'),
    removeCommentFromPostHandler: require('./removeCommentFromPostHandler')
}