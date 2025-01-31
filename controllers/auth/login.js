const registerSchema = require("../../modal/registerSchema")

const login = async (req, res) => {
    const {email , pass} = req.body

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
}

module.exports = login