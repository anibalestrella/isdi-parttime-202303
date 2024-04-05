const { ObjectId } = require('mongodb')
const getRandomCityName = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const length = Math.floor(Math.random() * 8) + 3;
    let cityName = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        cityName += alphabet[randomIndex];
    }
    return cityName.charAt(0).toUpperCase() + cityName.slice(1);
};

const randomCityName = getRandomCityName();

module.exports = {
    user: () => {
        console.log('Generate!!!');
        return {
            name: `name-${Math.random()}`,
            nickName: `nickname-${Math.floor(Math.random() * 10000)}`,
            email: `email-${Math.random()}@mail.com`,
            password: `password-${Math.random()}`,
            ipGeoLocation: [Math.random(), Math.random()],
            favArtists: `favArtists-${Math.random()}`,
            avatar: `avatar-${Math.random()}`,
            registrationDate: new Date(),
            city: `city-${randomCityName}`,
        }
    },

    event: userId => ({
        author: userId,
        poster: `poster-${Math.random()}`,
        name: `name-${Math.random()}`,
        description: `description-${Math.random()}`,
        lineUp: `lineUp-${Math.random()}`,
        place: `place-${Math.random()}`,
        price: `price-${Math.random()}`,
        likes: `likes-${Math.random()}`,
        eventReviews: `eventReviews-${Math.random()}`,
        score: `score-${Math.random()}`,
        dates: new Date(),
    }),
    artist: userId => ({
        author: userId,
        id: `id-${Math.random()}`,
        name: `name-${Math.random()}`,
    }),
    eventReview: userId => ({
        author: userId,
        event: `event-${Math.random()}`,
        score: `score-${Math.random()}`,
        title: `title-${Math.random()}`,
        text: `text-${Math.random()}`,
        image: `image-${Math.random()}`,
    }),
    place: userId => ({
        author: userId,
        id: `id-${Math.random()}`,
        name: `image-${Math.random()}`,
        city: `city-${Math.random()}`,
    })
}