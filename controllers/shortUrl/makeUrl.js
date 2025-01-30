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
            shortUrl: `http://localhost:8000/${existBigUrl.shortUrl}`
        })
    }

    const newShortUrl = new shortUrlSchema({
        bigUrl: bigUrl,
        shortUrl: shortedUrl
    })

    newShortUrl.save()

    res.render("homepage" , {
        msg: "Short Url Created Successfully",
        bigUrl: newShortUrl.bigUrl,
        shortUrl: `http://localhost:8000/${newShortUrl.shortUrl}`
    })
}

module.exports = makeUrl