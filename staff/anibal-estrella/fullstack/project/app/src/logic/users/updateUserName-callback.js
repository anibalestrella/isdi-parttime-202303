import { validators } from 'com';

const { validateToken, validateUserName, validateCallback } = validators;

/**
 * updateUserName.js
 * 
 * This function updates the user's username with the provided new username.
 * 
 * @param {string} token - User authentication token.
 * @param {string} userNewName - New username to be updated.
 * @param {function} [callback] - Optional callback function to handle asynchronous operations.
 * 
 * @throws {TypeError} - If the token or new username is not a string.
 * @throws {Error} - If the token or new username is blank, or if the new username contains invalid characters.
 * 
 * @returns {Promise} - If no callback is provided, returns a Promise that resolves when the update operation is successful.
 */
export default (token, userNewName, callback) => {
    validateToken(token);
    validateUserName(userNewName, 'userNewName');

    if (callback) {
        validateCallback(callback, 'callback function');

        const xhr = new XMLHttpRequest();

        xhr.onload = () => {
            const { status } = xhr;

            if (status !== 201) {
                const { response: json } = xhr;
                const { error } = JSON.parse(json);

                callback(new Error(error));
                return;
            }

            callback(null);
        };

        xhr.onerror = () => {
            callback(new Error('connection error'));
        };

        xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/user-name`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        const data = {
            name: userNewName,
        };

        const json = JSON.stringify(data);

        xhr.send(json);
        return;
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/user-name`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userNewName }),
    })
        .then((res) => {
            if (res.status !== 201) {
                // Return the JSON object
                return res.json().then(({ error: message }) => {
                    throw new Error(message);
                });
            }
        })
        .then(() => { });
};
