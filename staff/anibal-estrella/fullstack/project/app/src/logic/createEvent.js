import { validators } from 'com';
import context from "./context"

const { validateToken, validateText } = validators;


export default async function createEvent(author, eventPoster, eventName, eventDescription, eventLineup, eventDates, eventPlace, eventPrice) {
    validateToken(context.token, 'Session Token');
    validateText(eventName, 'Event\'s name');
    validateText(eventDescription, 'Event\'s Description');

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/create-event`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({ author, eventPoster, eventName, eventDescription, eventLineup, eventDates, eventPlace, eventPrice })
        });

        if (response.status !== 201) {
            const body = await response.json();
            throw new Error(body.error);
        }
    } catch (error) {
        throw new Error("There was a problem creating the event: " + error.message);
    }
};
