require('dotenv').config();

const mongoose = require('mongoose');
const uploadMedia = require('../uploadMedia');


mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        const files = [
            { filePath: './data-project/test/menItrust-01-poster.jpg', fileName: 'menItrust-01-poster.jpg' },
            // { filePath: './data-project/test/menItrust-01.mp4', fileName: 'menItrust-video' },
            // Add more files as needed
        ];

        return uploadMedia(files);
    })
    .then(response => {
        console.log("Upload response:", response);
        console.log("Media successfully uploaded!");
    })
    .catch(error => {
        console.error("Error uploading media:", error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
