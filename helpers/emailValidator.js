const emailValidator = (userMail)=>{
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userMail)){
        return (true)
    }else{
        return (false)
    }
}

module.exports = emailValidator