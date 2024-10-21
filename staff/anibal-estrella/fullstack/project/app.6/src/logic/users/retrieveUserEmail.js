/**
 * APP / retrieveUserEmail.js
 * Sends a login request to the API using the provided email.
 *
 * @param {string} email - The user's email address.
 * @throws {Error} - Throws an error if the request fails or the API returns an error response.
 * @returns {Promise<Object>} - A promise that resolves with the API response data (structure depends on the API).
 */

const retrieveUserEmail = (email) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/auth/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            if (res.status === 406)
                return res.json()
                    .then(body => {
                        throw { status: res.status, message: body.error };
                    })

            return res.json()
                .then(body => {
                    throw new Error(body.error,);
                });
        });
}
export default retrieveUserEmail;