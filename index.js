// dotenv import
require("dotenv").config()

// =============== All Variables
const express = require("express")
const router = require("./route")
const dbConnect = require("./config/dbConnect")
const app = express({caseSensitive : true})

// =============== All Uses
app.use(express.json())

// ejs engine 
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

// for sending url 
app.use(express.urlencoded({extended : false}))

// app router
app.use(router)

// data base connect
dbConnect()

// =============== local
const port = process.env.PORT || 8000;
app.listen(port, ()=> console.log(`T$rm@?&l ===== &&&&?@cut#$@D`))