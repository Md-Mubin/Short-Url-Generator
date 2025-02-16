const express = require("express")
const apiRoute = require("./api")
const {renderUrl, visitHistory} = require("../controllers/shortUrl/renderUrl")
const { home, register, login } = require("./staticSites")
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()

router.use(process.env.BASE_URL_API, apiRoute)

router.get("/", home)

router.get("/register", register)

router.get("/login", login)

router.get("/dashboard", authMiddleware ,async (req,res)=>{
    res.send("Dash board Page")
})

router.get("/:shortUrl", renderUrl)
router.get("/visithistory/:shortUrl", visitHistory)

router.use((req, res) => {
    res.render("noPage")
})

module.exports = router