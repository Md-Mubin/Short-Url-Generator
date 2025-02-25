const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const tokken = req.cookies

        if (tokken.access_token) {

            jwt.verify(tokken.access_token, process.env.ACSTOKEN, function (err, decoded) {

                if(err){
                    req.user = null
                    next()
                }
                
                else if (decoded.data) {
                    req.user = decoded.data
                    next()
                }
            })

        } else {
            req.user = null
            next()
        }

    } catch (error) {
        res.status(500).send("Server Side Error")
    }

}

module.exports = authMiddleware