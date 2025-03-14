const mongoose = require("mongoose")
const schema = mongoose.Schema;

const shortUrlSchema = new schema({
    bigUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    isAuth:{
        type : Boolean,
        default : false
    },
    visitHistory: [
        {
            clicked: {
                type: Date
            }
        }
    ]
})

module.exports = mongoose.model("shortUrl", shortUrlSchema)