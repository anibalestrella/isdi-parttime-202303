import { validators } from 'com';

const { validateText } = validators;


export default async function createEvent(author, eventPoster, eventName, eventDescription, eventLineup, eventDates, eventPlace, eventPriceInCents) {
    validateText(eventDescription, 'Event\'s Description');
    validateText(eventName, 'Event\'s name');

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/create-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, eventPoster, eventName, eventDescription, eventLineup, eventDates, eventPlace, eventPriceInCents })
        });

        if (response.status !== 201) {
            const body = await response.json();
            throw new Error(body.error);
        }
    } catch (error) {
        throw new Error("There was a problem creating the event: " + error.message);
    }
};
