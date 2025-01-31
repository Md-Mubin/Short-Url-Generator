const emailValidator = require("../../helpers/emailValidator")
const passwordValidator = require("../../helpers/passwordValidator")
const registerSchema = require("../../modal/registerSchema")

const register = async (req, res) => {
    const { userName, email, pass } = req.body

    try {
        if (!userName) {
            return res.render("registerPage",{
                error: "Name Required"
            })
        }

        if (!email) {
            return res.render("registerPage",{
                error: "Email Required"
            })
        }

        if (!emailValidator(email)) {
            return res.render("registerPage",{
                error: "Email is not Validated"
            })
        }

        if (!pass) {
            return res.render("registerPage",{
                error: "Password Required"
            })
        }

        const passwordValidateResult = passwordValidator(pass)

        if (passwordValidateResult) {
            return res.render("registerPage",{
                error: passwordValidateResult
            })
        }

        const userCreate = await registerSchema({
            userName, email, pass
        })

        userCreate.save()

        res.render("registerPage",{
            msg: "Register Successfull!"
        })
    } catch (error) {
        res.render({
            error: "Server Error"
        })
    }
}

module.exports = register