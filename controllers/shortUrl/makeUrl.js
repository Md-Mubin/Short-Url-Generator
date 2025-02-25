const shortUrlGenerate = require("../../helpers/shortUrlGenerate")
const urlValid = require("../../helpers/urlValid")
const registerSchema = require("../../modal/registerSchema")
const shortUrlSchema = require("../../modal/shortUrlSchema")

const makeUrl = async (req, res) => {

    try {
        // ======== big-url validation
        const { bigUrl } = req.body

        if (!bigUrl) {
            return res.render("homePage", {
                error: "Url is Required!"
            })
        }

        if (!urlValid(bigUrl)) {
            return res.render("homePage", {
                bigUrl: bigUrl,
                error: "Url is UnValid!"
            })
        }

        // ======== short url variable
        const shortedUrl = shortUrlGenerate(bigUrl)

        // ======== if user exists than go to private route
        if (req.user) {

            // ======== if the short url already created than update the short url
            const existBigUrl = await shortUrlSchema.findOneAndUpdate({ bigUrl }, { $set: { shortUrl: shortedUrl, isAuth: true } }, { new: true })

            if (existBigUrl) {

                await registerSchema.findByIdAndUpdate(req.user.id, { $addToSet: { shortUrls: existBigUrl._id } })

                return res.render("homePage", {
                    msg: "Short Url Updated",
                    bigUrl: existBigUrl.bigUrl,
                    shortUrl: `${process.env.BASE_URL}/${existBigUrl.shortUrl}`,
                    loggedUser: req.user
                })
            }

            // ======== if short url is not created than create
            const newShortUrl = new shortUrlSchema({
                bigUrl: bigUrl,
                shortUrl: shortedUrl,
                isAuth: true
            })

            newShortUrl.save()

            await registerSchema.findByIdAndUpdate(req.user.id, { $push: { shortUrls: newShortUrl._id } })

            res.render("homePage", {
                msg: "Short Url Created Successfully",
                bigUrl: newShortUrl.bigUrl,
                shortUrl: `${process.env.BASE_URL}/${newShortUrl.shortUrl}`,
                loggedUser: req.user
            })
        }

        // ======== if user doesn't exists than go to public route
        else {

            // ======== if the short url already created than update the short url
            const existBigUrl = await shortUrlSchema.findOneAndUpdate({ bigUrl }, { $set: { shortUrl: shortedUrl } }, { new: true })

            if (existBigUrl) {
                return res.render("homePage", {
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
 
            res.render("homePage", {
                msg: "Short Url Created Successfully",
                bigUrl: newShortUrl.bigUrl,
                shortUrl: `${process.env.BASE_URL}/${newShortUrl.shortUrl}`
            })
        }

    } catch (error) {
        res.status(500).render("noPage", {
            servErrMsg: "Server Side Error"
        })
    }
}

module.exports = makeUrl