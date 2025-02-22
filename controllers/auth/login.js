const registerSchema = require("../../modal/registerSchema")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const {email , pass} = req.body

    try {
        if(!email){
            return res.render("loginPage", {
                error : "Email required",
                email, pass
            })
        }
    
        if(!pass){
            return res.render("loginPage", {
                error : "Password required",
                email, pass
            })
        }
    
        // ========= registered user
        const registeredUser = await registerSchema.findOne({email})
    
        if(!registeredUser){
            return res.render("loginPage", {
                error : "No User Found",
                email, pass
            })
        }
    
        // ========= compare Password
        const comparePass = bcrypt.compare(pass , registeredUser.pass)

        if(!comparePass){
            return res.render("loginPage",{
                error : "Something went wrong",
                email, pass
            })
        }

        // ========= tokken
        const access_token = jwt.sign({
            data:{
                id : registeredUser._id,
                email : registeredUser.email
            }
        }, process.env.ACSTOKEN, { expiresIn : "1h" })

        if(!access_token){
            return res.render("loginPage",{
                error : "Something went wrong",
                email, pass
            })
        }
    
        res.cookie("access_token", access_token).redirect("/")
    
    } catch (error) {
        res.status(400).send("Server Error!")
    }
}

module.exports = login