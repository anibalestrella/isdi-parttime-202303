require('dotenv').config()

const mongoose = require('mongoose')
const uploadMedia = require('./uploadMedia')
const path = require('path')

mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        const filePath = path.join(__dirname, '../data-project/test/aliceInChains-01.webp');
        return uploadMedia(filePath, 'aliceInChains-04.web')
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
