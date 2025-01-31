const passwordValidator =(userPass)=>{

    if(userPass < 6 || userPass > 10){
        return "Password must be between 6 - 10 charecters"
    }

    if(!/[A-Z]/.test(userPass)){
        return "Must contain Capital letter atleast once"
    }

    if(!/[a-z]/.test(userPass)){
        return "Must contain smaller letter atleast once"
    }

    if(!/[0-9]/.test(userPass)){
        return "Must contain  A Number"
    }

    return false
}

module.exports = passwordValidator