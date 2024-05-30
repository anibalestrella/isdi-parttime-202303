const mongoose = require('mongoose')
const addPlace = require('../addPlace')
const { User, Event, artist, eventReview, Place } = require('../../data-project/models');
const id = "65d7108befbe9d1c3713cdec"
const text = 'lorem ipsum dolor';
const placeId = '2848703';
const userId = id;
const placeName = 'place-Name-' + text;
const city = 'city-' + text;

mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        return addPlace(userId, placeId, placeName, city)
    })
    .then(() => {
        console.log(`Place ${placeName} successfully created!`);
    })
    .catch(error => {
        console.error(`Error creating Place: ${placeName}`, error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
