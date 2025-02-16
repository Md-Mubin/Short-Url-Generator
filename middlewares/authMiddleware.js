const authMiddleware = (req, res, next) => {
    const user = true
    if(!user){
        return res.send("un authorized")
    }
    next()
}

module.exports = authMiddleware