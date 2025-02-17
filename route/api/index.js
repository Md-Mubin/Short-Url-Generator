const express = require("express")
const authRoute = require("./auth")
const shortUrlRoute = require("./shortUrl")
const authMiddleware = require("../../middlewares/authMiddleware")
const apiRoute = express.Router()

apiRoute.use("/auth", authRoute)

apiRoute.use("/shortUrl", authMiddleware, shortUrlRoute)

module.exports = apiRoute