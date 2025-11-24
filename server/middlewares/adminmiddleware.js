const jwt = require('jsonwebtoken')
function adminVerify(req, res, next) {
    try {
        const token = req.headers.authorization.slice(7)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        if (decoded.admin) {
            next()
        }
        else {
            res.status(403).send({
                message: "Unauthorized"
            })
        }
    }
    catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(403).send({
                message: "Invalid token"
            })
        }
        else {
            res.status(500)
        }
    }
}
module.exports = adminVerify