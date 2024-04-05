const { uploadMedia } = require('../logic')

const { errors: { DuplicityError, ContentError, UploadError } } = require('com')

module.exports = (req, res) => {
    debugger
    try {
        const { file, fileName } = req.body
        uploadMedia(file, fileName)
            // happy path 😄
            .then(response => res.status(201).json(response))
            // unhappy path 😢
            .catch(error => {
                let status = 500

                if (error instanceof DuplicityError)
                    status = 409
                else if (error instanceof UploadError)
                    status = 400 // 400 for Bad Request, but you can adjust this

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError)
            status = 406

        res.status(status).json({ error: error.message })
    }
}
