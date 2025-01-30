const express = require("express")
const login = require("../../controllers/auth/login")
const register = require("../../controllers/auth/register")
const authRoute = express.Router()

authRoute.post("/login", login)

authRoute.post("/register", register)

module.exports = authRoute