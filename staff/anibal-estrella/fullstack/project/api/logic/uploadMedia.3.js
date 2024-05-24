const fs = require('fs');
const ImageKit = require("imagekit");

const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateId }
} = require('com');


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadMedia = (files) => {
    if (files.length > 5) {
        return Promise.reject(new Error("Exceeded maximum number of files. Maximum allowed: 5"));
    }

    const uploadPromises = files.map(({ file }) => {
        return new Promise((resolve, reject) => {
            // Check file size
            const fileSizeInBytes = file.size;
            const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes > 25) {
                reject(new Error(`${file.name} exceeds the maximum file size of 25 MB`));
                return; // Stop processing this file
            }

            // Read file as base64
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result.split(',')[1]; // Extract base64 string
                // Upload image to ImageKit
                imagekit.upload({
                    file: base64Image,
                    fileName: file.name // Use the original file name
                }, function (error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file); // Read file as data URL
        });
    });

    return Promise.all(uploadPromises);
};

module.exports = uploadMedia;