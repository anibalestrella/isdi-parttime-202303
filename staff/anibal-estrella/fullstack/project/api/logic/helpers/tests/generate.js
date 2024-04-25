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
function generateRandomAlphaString(length) {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphanumeric.length);
        randomString += alphanumeric[randomIndex];
    }
    return randomString;
}
const randomCityName = getRandomCityName();

module.exports = {


    user: () => ({
        _id: `post-${Math.random()}`,
        name: `${generateRandomAlphaString(10).toLowerCase()}`,
        nickName: `${generateRandomAlphaString(11).toLowerCase()}`,
        email: `email-${Math.random().toString(36).substring(7)}@mail.com`, // Random valid email format
        password: `${generateRandomAlphaString(8)}`,
        ipGeoLocation: [Math.random(), Math.random()],
        favArtists: `favArtists-${Math.random()}`,
        // avatar: `avatar-${Math.random()}`,
        avatar: `./assets/avatar-default.svg`,
        registrationDate: new Date().toISOString(),
        city: `city-${randomCityName}`,

    }),

    event: () => {
        try {
            return {
                author: `author-${Math.random()}`,
                poster: `poster-${Math.random()}`,
                name: `name-${Math.random()}`,
                description: `description-${Math.random()}`,
                lineUp: `lineUp-${Math.random()}`,
                place: `place-${Math.random()}`,
                price: `price-${Math.random()}`,
                likes: `likes-${Math.random()}`,
                eventReviews: `eventReviews-${Math.random()}`,
                score: `score-${Math.random()}`,
                dates: new Date().toISOString(),
            };
        } catch (error) {
            console.error('Error generating event:', error);
            throw error;
        }
    },

    artist: () => {
        try {
            return {
                author: `author-${Math.random()}`,
                id: `id-${Math.random()}`,
                name: `name-${Math.random()}`,
            };
        } catch (error) {
            console.error('Error generating artist:', error);
            throw error;
        }
    },

    eventReview: () => {
        try {
            return {
                author: `author-${Math.random()}`,
                event: `event-${Math.random()}`,
                score: `score-${Math.random()}`,
                title: `title-${Math.random()}`,
                text: `text-${Math.random()}`,
                image: `image-${Math.random()}`,
            };
        } catch (error) {
            console.error('Error generating event review:', error);
            throw error;
        }
    },

    place: () => {
        try {
            return {
                author: `author-${Math.random()}`,
                id: `id-${Math.random()}`,
                name: `image-${Math.random()}`,
                city: `city-${randomCityName}`,
            };
        } catch (error) {
            console.error('Error generating place:', error);
            throw error;
        }
    },
};
