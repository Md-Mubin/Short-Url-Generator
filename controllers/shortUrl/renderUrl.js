const shortUrlSchema = require("../../modal/shortUrlSchema")

const renderUrl = async (req,res)=>{
    const {shortUrl} = req.params

    const existUrl = await shortUrlSchema.findOneAndUpdate({shortUrl}, {$push : {visitHistory : {clicked : Date.now()}}}, {new : true})

    if(!existUrl){
        return res.render("noPage")
    }
console.log(existUrl)
    return res.redirect(existUrl.bigUrl)
}

const visitHistory = async (req,res)=>{
    const {shortUrl}= req.params

    const existUrl = await shortUrlSchema.findOne({shortUrl})

    if(!existUrl){
        return res.render("noPage")
    }

    return res.send(existUrl)
}

module.exports = {renderUrl , visitHistory}