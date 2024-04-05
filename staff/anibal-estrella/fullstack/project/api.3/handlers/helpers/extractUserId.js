const jwt = require('jsonwebtoken')
/**
 * Api/handlers/ExtractUserId.js
 * Extract User ID from token
 * @param {string} req 
 * @returns 
 */
function extractUserId(req) {

    const { authorization } = req.headers
    const token = authorization.slice(7)

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const { sub: userId } = payload

    return userId
}

module.exports = extractUserId