require('dotenv').config();

const mongoose = require('mongoose');
const uploadMedia = require('../uploadMedia');
const imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPMAAADPCAMAAAAXkBfbAAABVlBMVEX...";


mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        const files = [
            { imageData }
            // { filePath: './data-project/test/astro.webp', fileName: 'astro' },
            // { filePath: './data-project/test/menItrust-01.mp4', fileName: 'menItrust-video' },
            // Add more files as needed
        ];

        return uploadMedia(files);
    })
    .then(response => {
        console.log("Upload response:", response);
        console.log("Upload response:", response[0].url);
        console.log("Media successfully uploaded!");
    })
    .catch(error => {
        console.error("Error uploading media:", error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
