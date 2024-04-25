require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const {
    helloApiHandler,
    registerUserHandler,
    authenticateUserHandler,
    updateUserAvatarHandler,
    updateUserPasswordHandler,
    updateUserEmailHandler,
    createPostHandler,
    deletePostHandler,
    updatePostHandler,
    toggleLikePostHandler,
    toggleFavPostHandler,
    retrieveUserHandler,
    retrievePostHandler,
    retrievePostsHandler,
    retrieveFavPostsHandler,
    retrieveLikedPostsHandler,
    addCommentToPostHandler,
    removeCommentFromPostHandler
} = require('./handlers')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {

        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloApiHandler)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.get('/posts', retrievePostsHandler)

        api.get('/posts/:postId', retrievePostHandler)

        api.get('/posts/likes/', retrieveLikedPostsHandler)

        api.get('/posts/favs', retrieveFavPostsHandler)

        api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

        api.patch('/posts/:postId/likes', toggleLikePostHandler)

        api.patch('/users/favs/:postId', toggleFavPostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.patch('/posts/post/:postId', jsonBodyParser, updatePostHandler)

        api.post('/posts/:postId/comments', jsonBodyParser, addCommentToPostHandler)

        api.delete('/posts/:postId/comments/:commentId', removeCommentFromPostHandler)

        api.listen(process.env.PORT, () => console.log(`//////////////\nSERVER RUNNING\nIN PORT *${process.env.PORT}*\n//////////////`))



    })

    .catch(error => console.error)