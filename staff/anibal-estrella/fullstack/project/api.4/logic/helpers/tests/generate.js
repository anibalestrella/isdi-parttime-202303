
function generateRandomAlphaString(length) {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alpha.length);
        randomString += alpha[randomIndex];
    }
    return randomString;
}

function generateRandomPassword(length) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*';

    // Combine all character sets
    const allChars = lowercaseChars + uppercaseChars + digitChars + specialChars;

    let password = '';
    let hasLowercase = false;
    let hasUppercase = false;
    let hasDigit = false;
    let hasSpecialChar = false;

    // Generate random password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        const randomChar = allChars[randomIndex];
        password += randomChar;

        // Check if the character type is found in the password
        if (lowercaseChars.includes(randomChar)) {
            hasLowercase = true;
        } else if (uppercaseChars.includes(randomChar)) {
            hasUppercase = true;
        } else if (digitChars.includes(randomChar)) {
            hasDigit = true;
        } else if (specialChars.includes(randomChar)) {
            hasSpecialChar = true;
        }
    }

    // Ensure password meets the criteria
    if (!(hasLowercase && hasUppercase && hasDigit && hasSpecialChar)) {
        // Regenerate the password if it doesn't meet the criteria
        return generateRandomPassword(length);
    }

    return password;
}

module.exports = {
    user: () => ({
        _id: `post-${Math.random()}`,
        name: `${generateRandomAlphaString(10).toLowerCase()}`,
        nickName: `${generateRandomAlphaString(11).toLowerCase()}`,
        email: `email-${Math.random().toString(36).substring(7)}@mail.com`, // Random valid email format
        password: `${generateRandomPassword(12)}`,
        ipGeoLocation: [Math.random(), Math.random()],
        favArtists: `favArtists-${Math.random()}`,
        // avatar: `avatar-${Math.random()}`,
        avatar: `./assets/avatar-default.svg`,
        registrationDate: new Date().toISOString(),
        city: generateRandomAlphaString(10),

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
