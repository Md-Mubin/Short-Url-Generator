const express = require("express")
const apiRoute = require("./api")
const {renderUrl} = require("../controllers/shortUrl/renderUrl")
const { home, register, login } = require("./staticSites")
const authMiddleware = require("../middlewares/authMiddleware")
const registerSchema = require("../modal/registerSchema")
const router = express.Router()

router.use(process.env.BASE_URL_API, apiRoute)

router.get("/", authMiddleware, home)
router.get("/register", register)
router.get("/login", login)

router.post("/logout", (req,res)=>{
    res.clearCookie("access_token")
    res.redirect("/login")
})

router.get("/dashboard", authMiddleware ,async (req,res)=>{
    if(req.user){
        const loggedUserInfo = await registerSchema.findById(req.user.id).select("-pass").populate("shortUrls")
        res.send(loggedUserInfo)
    }else{
        res.redirect("/login")
    }
})

router.get("/:shortUrl", renderUrl)

router.use((req, res) => {
    res.render("noPage")
})

module.exports = router