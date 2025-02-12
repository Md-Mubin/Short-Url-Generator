const shortUrlGenerate = require("../../helpers/shortUrlGenerate")
const urlValid = require("../../helpers/urlValid")
const shortUrlSchema = require("../../modal/shortUrlSchema")

const makeUrl = async (req, res) => {
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

    const shortedUrl = shortUrlGenerate(bigUrl)
    
    const existBigUrl = await shortUrlSchema.findOneAndUpdate({ bigUrl }, {$set : { shortUrl : shortedUrl}}, {new : true})

    if (existBigUrl) {
        return res.render("homePage" ,{
            msg: "Short Url Created Successfully",
            bigUrl: existBigUrl.bigUrl,
            shortUrl: `${process.env.BASE_URL}/${existBigUrl.shortUrl}`
        })
    }

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