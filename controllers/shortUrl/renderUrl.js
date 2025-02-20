const shortUrlSchema = require("../../modal/shortUrlSchema")

const renderUrl = async (req,res)=>{
    const {shortUrl} = req.params

    const existUrl = await shortUrlSchema.findOneAndUpdate({shortUrl}, {$push : {visitHistory : {clicked : Date.now()}}}, {new : true})

    if(!existUrl){
        return res.render("noPage")
    }

    return res.redirect(existUrl.bigUrl)
}

module.exports = {renderUrl}