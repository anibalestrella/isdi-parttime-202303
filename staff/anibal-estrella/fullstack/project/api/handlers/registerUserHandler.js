
const { registerUser } = require('../logic')
const jwt = require('jsonwebtoken')

const { errors: { DuplicityError, ContentError } } = require('com')

module.exports = (req, res) => {
    try {
        const { name, nickName, email, password, city, ipGeoLocation } = req.body
        registerUser(name, nickName, email, password, city, ipGeoLocation)
            // happy path 😄
            .then(() => res.status(201).send())
            // unhappy path 😢
            .catch(error => {
                let status = 500

                if (error instanceof DuplicityError)
                    status = 409

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError)
            status = 406

        res.status(status).json({ error: error.message })
    }
}