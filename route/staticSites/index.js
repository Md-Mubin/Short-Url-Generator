const home = (req,res)=>{
    res.render("homePage")
}

const login = (req,res)=>{
    res.render("loginPage")
}

const register = (req,res)=>{
    res.render("registerPage")
}

module.exports = {home, login, register}