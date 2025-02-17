const shortUrlGenerate = require("../../helpers/shortUrlGenerate")
const urlValid = require("../../helpers/urlValid")
const shortUrlSchema = require("../../modal/shortUrlSchema")

const makeUrl = async (req, res) => {

    // ======== big-url validation
    const { bigUrl } = req.body

    if (!bigUrl) {
        return res.render("homePage",{
            error : "Url is Required!"
        })
    }

    if (!urlValid(bigUrl)) {
        return res.render("homePage",{
            bigUrl : bigUrl,
            error : "Url is UnValid!"
        })
    }

    // ======== short url variable
    const shortedUrl = shortUrlGenerate(bigUrl)
    
    // ======== if the short url already created than update the short url
    const existBigUrl = await shortUrlSchema.findOneAndUpdate({ bigUrl }, {$set : { shortUrl : shortedUrl}}, {new : true})

    if (existBigUrl) {
        return res.render("homePage" ,{
            msg: "Short Url Updated",
            bigUrl: existBigUrl.bigUrl,
            shortUrl: `${process.env.BASE_URL}/${existBigUrl.shortUrl}`
        })
    }

    // ======== if short url is not created than create
    const newShortUrl = new shortUrlSchema({
        bigUrl: bigUrl,
        shortUrl: shortedUrl
    })

    newShortUrl.save()

    res.render("homePage" , {
        msg: "Short Url Created Successfully",
        bigUrl: newShortUrl.bigUrl,
        shortUrl: `${process.env.BASE_URL}/${newShortUrl.shortUrl}`
    })
}

module.exports = makeUrl