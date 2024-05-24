const fs = require('fs');
const ImageKit = require("imagekit");
const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateId }
} = require('com');

const { User, Event } = require('../data-project/models.js');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadMedia = (files) => {
    if (files.length > 5) {
        return Promise.reject(new Error("Exceeded maximum number of files. Maximum allowed: 5"));
    }

    const uploadPromises = files.map(({ filePath, fileName }) => {
        return new Promise((resolve, reject) => {
            const stats = fs.statSync(filePath);
            const fileSizeInBytes = stats.size;
            const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

            if (fileSizeInMegabytes > 25) {
                reject(new Error(`${fileName} exceeds the maximum file size of 25 MB`));
            }

            const fileData = fs.readFileSync(filePath);
            const base64Image = fileData.toString('base64');

            imagekit.upload({
                file: base64Image,
                fileName: fileName
            }, function (error, result) {
                if (error) reject(error);
                else resolve(result);
            });
        });
    });

    return Promise.all(uploadPromises);
};

module.exports = uploadMedia;
