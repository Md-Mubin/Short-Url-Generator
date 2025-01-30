const express = require("express")
const makeUrl = require("../../controllers/shortUrl/makeUrl")
const shortUrlRoute = express.Router()

shortUrlRoute.post("/generateUrl" , makeUrl)

module.exports = shortUrlRoute
