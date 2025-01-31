const registerSchema = require("../../modal/registerSchema")

const login = async (req, res) => {
    const {email , pass} = req.body

    try {
        if(!email){
            return res.render("loginPage", {
                error : "Email required"
            })
        }
    
        if(!pass){
            return res.render("loginPage", {
                error : "Password required"
            })
        }
    
        const registeredUser = await registerSchema.findOne({email})
    
        if(!registeredUser){
            return res.render("loginPage", {
                error : "No User Found"
            })
        }
    
        if(registeredUser.pass !== pass){
            return res.render("loginPage", {
                error : "No User Found"
            })
        }
    
        res.send(registeredUser)
    } catch (error) {
        res.status(400).send("Server Error!")
    }
}

module.exports = login