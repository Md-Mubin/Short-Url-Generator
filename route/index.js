const express = require("express")
const apiRoute = require("./api")
const renderUrl = require("../controllers/shortUrl/renderUrl")
const { home, register, login } = require("./staticSites")
const authMiddleware = require("../middlewares/authMiddleware")
const registerSchema = require("../modal/registerSchema")
const router = express.Router()

router.use(process.env.BASE_URL_API, apiRoute)

// home, register and login static page
router.get("/", authMiddleware, home)
router.get("/register", register)
router.get("/login", login)

// for logout
router.post("/logout", (req,res)=>{
    res.clearCookie("access_token").redirect("/login")
})

// for dashboard
router.get("/dashboard", authMiddleware, async (req,res)=>{
    if(req.user){
        const loggedUserInfo = await registerSchema.findById(req.user.id).select("-pass").populate("shortUrls")
        res.render("dashboard",{
            loggedUserInfo,
            loggedUser : req.user
        })
    }else{
        res.redirect("/login")
    }
})

// short url render route
router.get("/:shortUrl", renderUrl)

// global any route
router.use((req, res) => {
    res.render("noPage")
})

module.exports = router