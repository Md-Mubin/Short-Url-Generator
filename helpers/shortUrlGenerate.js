const shortUrlGenerate = () => {
    const charecter = "QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzlkjhgfdsapoiuytrewq1234567890"
    let shortUrl = ""

    for (let i = 0; i < 6; i++) {
        const random = Math.floor(Math.random() * charecter.length)
        shortUrl += charecter[random]
    }
    
    return shortUrl
}

module.exports = shortUrlGenerate