
const { uploadMedia } = require('../logic');
const { extractUserId, handleErrors } = require('./helpers');

module.exports = handleErrors(async (req, res) => {
    const userId = extractUserId(req);
    const { files } = req.body;

    try {
        const results = await uploadMedia(files);
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
