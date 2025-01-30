// =============== All Variables
require("dotenv").config()
const express = require("express")
const router = require("./route")
const dbConnect = require("./config/dbConnect")
const app = express({caseSensitive : true})

// =============== All Uses
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended : false}))
app.use(router)
dbConnect()

// =============== local
const PORT = process.env.BASE_URL || 8000;
app.listen(PORT, ()=> console.log("T$rm@?&l ===== &&&&?@cut#$@D"))