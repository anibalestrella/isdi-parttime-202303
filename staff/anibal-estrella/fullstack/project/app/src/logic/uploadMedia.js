/**
 * uploadMedia.js
 * Uploads files to the server.
 *
 * @params {File[]} files - An array of files to upload.
 * @params {string} name - A name to associate with the uploaded files.
 *
 * @returns {Promise<void>} A promise that resolves when the upload is complete,
 * or rejects with an error if the upload fails.
 */


export default function uploadMedia(files, name) {

    return fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ files, name })
    })
        .then(res => {
            if (res.status === 201)
                return

            return res.json()
                .then(body => {
                    throw new Error(body.error)
                })
        })
}