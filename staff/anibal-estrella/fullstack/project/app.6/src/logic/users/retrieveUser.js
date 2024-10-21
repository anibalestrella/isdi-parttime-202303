import context from "../context"

/**
 * APP/ retrieveUser.js
 * Fetches user data from the API.
 *
 * @throws {Error} - Throws an error if the request fails or the API returns an error response.
 * @returns {Promise<Object>} - A promise that resolves to an object containing user data (structure depends on the API).
 */

const retrieveUser = () =>
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    throw new Error(body.message)
                })
        })
        .catch(error => {
            throw new Error('Failed to retrieve user data. Please try again later.');
        });

export default retrieveUser;
