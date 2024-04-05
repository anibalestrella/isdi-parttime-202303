require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ImageKit = require("imagekit");

if (
    !process.env.IMAGEKIT_PUBLIC_KEY ||
    !process.env.IMAGEKIT_PRIVATE_KEY ||
    !process.env.IMAGEKIT_URL_ENDPOINT ||
    !process.env.MONGODB_URL ||
    !process.env.PORT
) {
    console.error("Missing required configuration in environment variables.");
    process.exit(1);
}

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

console.log("Public Key:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("Private Key:", process.env.IMAGEKIT_PRIVATE_KEY);
console.log("URL Endpoint:", process.env.IMAGEKIT_URL_ENDPOINT);

const {
    helloApiHandler,
    registerUserHandler,
    authenticateUserEmailHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    updateUserProfileHandler,
    addArtistHandler,
    uploadMediaHandler,
    createEventHandler,
    createEventReviewHandler,
} = require('./handlers')


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {

        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloApiHandler)

        api.post('/users', jsonBodyParser, registerUserHandler)
        debugger

        api.post('/users/auth/email', jsonBodyParser, authenticateUserEmailHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.patch('/users/user-update-profile', jsonBodyParser, updateUserProfileHandler)

        api.post('/add-artist', jsonBodyParser, addArtistHandler)

        // api.post('/upload', jsonBodyParser, uploadMediaHandler)

        // api.post('/create-event', jsonBodyParser, createEventHandler)

        // api.post('/create-event-review', jsonBodyParser, createEventReviewHandler)


        // api.get('/events', retrieveEventsHandler)

        // api.get('/events/:postId', retrieveEventHandler)

        // api.get('/events/likes/', retrieveLikedEventsHandler)

        // api.get('/events/favs', retrieveFavEventsHandler)

        // api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        // api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)


        // api.patch('/events/:postId/likes', toggleLikeEventHandler)

        // api.patch('/users/favs/:postId', toggleFavEventHandler)

        // api.delete('/events/:postId', deleteEventHandler)

        // api.patch('/events/post/:postId', jsonBodyParser, updateEventHandler)

        // api.post('/events/:postId/comments', jsonBodyParser, addCommentToEventHandler)

        // api.delete('/events/:postId/comments/:commentId', removeCommentFromEventHandler)

        api.listen(process.env.PORT, () => console.log(`//////////////\nSERVER RUNNING\nIN PORT *${process.env.PORT}*\n//////////////`))



    })

    .catch(error => console.error(error))