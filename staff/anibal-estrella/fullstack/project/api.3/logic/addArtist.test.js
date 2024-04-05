const mongoose = require('mongoose')
const addArtist = require('./addArtist')
const { User, Event, artist, eventReview } = require('../data-project/models');
mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        const id = "65d7108befbe9d1c3713cdec"

        const text = 'lorem ipsum dolor';

        const ArtistId = '2848703';
        const userId = id;
        const name = 'artistName-' + text;


        return addArtist(userId, ArtistId, name);
    })
    .then(() => {
        console.log(`Artist ${name} successfully created!`);
    })
    .catch(error => {
        console.error("Error creating Artist:", error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
