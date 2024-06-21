const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    ipGeoLocation: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number], // array of numbers: [longitude, latitude]
            required: true,
            validate: {
                validator: function (v) {
                    return v.length === 2;
                },
                message: props => `${props.value} is not a valid coordinates array!`
            }
        }
    },
    city: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "./assets/avatar-default.svg"
    },
    favArtists: {
        type: [ObjectId],
        ref: 'User'
    }
})


const event = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    poster: {
        type: String,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    lineUp: {
        type: [{
            artist: {
                type: ObjectId,
                ref: 'Artist',
                required: true
            },
            category: {
                type: ObjectId,
                ref: 'Category',
                required: true
            }
        }],
        required: true
    },
    categories: [{
        type: ObjectId,
        ref: 'Category'
    }],
    dates: [{
        type: Date,
        required: true
    }],
    place: {
        type: ObjectId,
        ref: 'Place',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    likes: {
        type: [ObjectId],
        ref: 'User'
    },
    eventReviews: {
        type: [ObjectId],
        ref: 'EventReview',
        required: true
    },
    score: [{
        value: {
            type: Number,
            required: true
        },
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        }
    }],
    eventTag: {
        type: [String],
        required: true,
    }
});


const artist = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const eventReview = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: ObjectId,
        ref: 'Event',
        required: true,
    },
    score: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    setList: {
        type: [String],
        required: false
    },
    image: [String],
    audio: [String],
    video: [String],
    likes: {
        type: [ObjectId],
        ref: 'User'
    },
})

const scoreStats = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    avgScore: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

const place = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    }
})

user.index({ "ipGeoLocation.coordinates": "2dsphere" });

const User = model('User', user)
const Event = model('Event', event)
const Artist = model('Artist', artist)
const EventReview = model('EventReview', eventReview)
const Place = model('Place', place)
const ScoreStats = model('ScoreStats', scoreStats);

module.exports = {
    User,
    Event,
    Artist,
    EventReview,
    Place,
    ScoreStats
}