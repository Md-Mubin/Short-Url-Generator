const home = (req,res)=>{
    res.render("homePage" ,{
        loggedUser : req.user
    })
}

const login = (req,res)=>{
    res.render("loginPage")
}

const register = (req,res)=>{
    res.render("registerPage")
}

module.exports = {home, login, register}