const emailValidator = require("../../helpers/emailValidator")
const passwordValidator = require("../../helpers/passwordValidator")
const registerSchema = require("../../modal/registerSchema")

const register = async (req, res) => {
    const { userName, email, pass } = req.body

    try {

        // if user name is empty
        if (!userName) {
            return res.render("registerPage",{
                error: "Name Required",
                userName, email, pass
            })
        }

        // if email is empty
        if (!email) {
            return res.render("registerPage",{
                error: "Email Required",
                userName, email, pass
            })
        }

        // if email is not  validated
        if (!emailValidator(email)) {
            return res.render("registerPage",{
                error: "Email is not Validated",
                userName, email, pass
            })
        }

        // if password is empty
        if (!pass) {
            return res.render("registerPage",{
                error: "Password Required",
                userName, email, pass
            })
        }

        // variable for dynamic passowrd validate error
        const passwordValidateResult = passwordValidator(pass)

        if (passwordValidateResult) {
            return res.render("registerPage",{
                error: passwordValidateResult,
                userName, email, pass
            })
        }

        // if user with email already exists
        const existUser = await registerSchema.findOne({email})

        if(existUser){
            return res.render("registerPage",{
                error: "Email alredy in use",
                userName, email, pass
            })
        }
        
        // create user
        const userCreate = registerSchema({
            userName, email, pass
        })

        userCreate.save()

        // register successfull massage
        res.render("registerPage",{
            msg: "Register Successfull!",
            userName, email, pass
        })

    } catch (error) {
        res.render("registerPage",{
            error: "Server Error",
            userName, email, pass
        })
    }
}

module.exports = register