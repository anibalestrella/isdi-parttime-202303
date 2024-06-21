const fs = require('fs');
const ImageKit = require("imagekit");

const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateId, validateFileUpload }
} = require('com');


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

/**
 * API/ Uploads media files to ImageKit.
 *
 * @param {Array<Object>} files - An array of file objects containing properties:
 *   - `file` (String): The base64 encoded content of the file.
 *   - `fileName` (String): The desired filename for the uploaded file on ImageKit.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects containing upload results for each file.
 *   - Each object will have properties based on ImageKit's API response (consult their documentation).
 * @throws {Error} If any errors occur during validation, upload, or promise handling.
 */

const uploadMedia = async (files) => {
    if (files.length > 5) {
        return Promise.reject(new Error("Exceeded maximum number of files. Maximum allowed: 5"));
    }

    debugger

    const uploadPromises = files.map((file, index) => {

        validateFileUpload(file);

        return new Promise((resolve, reject) => {
            try {
                const base64Image = file.file.split(',')[1]
                const name = file.fileName

                const options = {
                    file: base64Image,
                    fileName: name,
                    folder: '/Avatar',
                    tags: ['LiveDive']
                };


                imagekit.upload(options, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log(result);
                        resolve(result);
                    }
                });

            } catch (error) {
                reject(error);

            }
        });
    });

    try {
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        throw new Error(`Error uploading files: ${error.message}`);
    }
};

module.exports = uploadMedia;
