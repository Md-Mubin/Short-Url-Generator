const shortUrlSchema = require("../../modal/shortUrlSchema")

const renderUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params

        const shortUrlInfos = await shortUrlSchema.findOne({shortUrl})

        if(!shortUrlInfos){
            return res.render("noPage")
        }

        if(shortUrlInfos.isAuth){
            const authUrl = await shortUrlSchema.findByIdAndUpdate(shortUrlInfos._id, {$push : {visitHistory : {clicked : Date.now()}}}, {new : true})

            res.redirect(authUrl.bigUrl)
        }else{
            res.redirect(shortUrlInfos.bigUrl)
        }

    } catch (error) {
        res.send("Server Error!")
    }
}

module.exports = renderUrl