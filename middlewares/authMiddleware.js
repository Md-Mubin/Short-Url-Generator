const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const tokken = req.cookies

        if (!tokken) return res.status(400).send("Un-Authorized")

        const decoded = jwt.verify(tokken.access_token, process.env.ACSTOKEN)

        if (decoded.data) {
            req.user = decoded.data
            next()
        }
    } catch (error) {
        res.status(500).send("Server Side Error")
    }

}

module.exports = authMiddleware