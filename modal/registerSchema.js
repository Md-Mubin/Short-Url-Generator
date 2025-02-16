const mongoose = require("mongoose")
const schema = mongoose.Schema;

const registerSchema = new schema({
    userName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        uniqe : true
    },
    pass:{
        type : String,
        required : true
    },
    shortUrls : {
        ref : "shortUrl",
        type : [schema.Types.ObjectId]
    }
})

module.exports = mongoose.model("User", registerSchema)