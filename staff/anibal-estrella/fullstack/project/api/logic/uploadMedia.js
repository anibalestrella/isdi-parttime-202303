const fs = require('fs')
const ImageKit = require("imagekit");

// You can initialize ImageKit here or in your main application.

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


/**
 * Function to upload media file to ImageKit service
 * @param {string} filePath - Path to the media file
 * @param {string} fileName - Name of the file
 * @returns {Promise<Object>} - A Promise that resolves with the upload result or rejects with an error
 */

const uploadMedia = (filePath, fileName) => {
    return new Promise((resolve, reject) => {
        const fileData = fs.readFileSync(filePath);
        const base64Image = fileData.toString('base64'); // Convert buffer to base64

        imagekit.upload({
            file: base64Image, // Base64 encoded string
            fileName: fileName
        }, function (error, result) {
            if (error) reject(error);
            else resolve(result);
        });
    });
};

module.exports = uploadMedia;
