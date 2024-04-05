const mongoose = require('mongoose')
const createEvent = require('./createEvent')
const { User, Event } = require('../data-project/models')
mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        const id = "65d7108befbe9d1c3713cdec"
        const text = 'lorem ipsum dolor';
        const userId = id;
        const name = 'Title-' + text;
        const description = 'description-' + text;
        const image = 'https://ik.imagekit.io/7viapifcc/menItrust-01_pXB5yULQm.jpg?updatedAt=1692962625579';
        const poster = image
        const artistId = '2848703';
        const dates = "1978-01-17"
        const place = "2848703"
        const price = "5,55"
        const score = '10,99';




        return createEvent(
            userId,
            poster,
            name,
            description,
            artistId,
            dates,
            place,
            price,
            score
        );
    })
    .then(() => {
        console.log("Event successfully created!");
    })
    .catch(error => {
        console.error("Error creating event:", error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
