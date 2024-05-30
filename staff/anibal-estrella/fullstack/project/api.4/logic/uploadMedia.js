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

const uploadMedia = async (files) => {
    if (files.length > 5) {
        return Promise.reject(new Error("Exceeded maximum number of files. Maximum allowed: 5"));
    }

    debugger

    const uploadPromises = files.map((file, index) => {

        validateFileUpload(file);

        return new Promise((resolve, reject) => {
            try {
                const base64Image = file.file.split(',')[1]; // Extract base64 string
                const name = file.fileName
                const fileSizeInBytes = Buffer.byteLength(base64Image, 'base64');
                const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                if (fileSizeInMegabytes > 25) {
                    return reject(new Error('File exceeds the maximum file size of 25 MB'));
                }

                imagekit.upload({
                    file: base64Image,
                    fileName: name
                }, (error, result) => {
                    if (error) {
                        return reject(error);
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
