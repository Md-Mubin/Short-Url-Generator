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
    author :{
        ref : "User",
        type : schema.Types.ObjectId
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