const registerSchema = require("../../modal/registerSchema")
const bcrypt = require("bcrypt") 
const jst = require("jsonwebtoken")

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
    
        const registeredUser = await registerSchema.findOne({email})
    
        if(!registeredUser){
            return res.render("loginPage", {
                error : "No User Found",
                email, pass
            })
        }
    
        const loggedUser = bcrypt.compare(pass , registeredUser.pass)

        if(!loggedUser){
            return res.render("loginPage",{
                error : "Something went wrong",
                email, pass
            })
        }
    
        res.send(registeredUser)
    } catch (error) {
        res.status(400).send("Server Error!")
    }
}

module.exports = login