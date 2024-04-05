const mongoose = require('mongoose')
const createEventReview = require('./createEventReview')
const { User, Event, Place, EventReview } = require('../data-project/models')
const userId = '65d7108befbe9d1c3713cdec';
const eventId = '65e85b715580d9b939b55502';
const placeId = '65e8610f827dd406f2f5a9f2';
const lineUp = '65e743ea4828eb8df60104d9';
const image = 'https://ik.imagekit.io/7viapifcc/menItrust-01_pXB5yULQm.jpg?updatedAt=1692962625579';
const text = 'Text- Sample Event Description';
const reviewText = text.repeat(5)
const title = 'Title- Sample Event title';
const score = '10,99';

const dates = new Date();
const price = '10,99';

mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {

        return createEventReview(eventId, userId, title, reviewText, lineUp, dates, placeId, score, image);
    })
    .then(() => {
        console.log("Event REVIEW successfully created!");
    })
    .catch(error => {
        console.error("Error creating event REVIEW:", error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
