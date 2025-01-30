const urlValid = (bigUrl)=>{
    let validation = bigUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    if(validation == null){
        return false
    }
    else{
        return true
    }
}

module.exports = urlValid