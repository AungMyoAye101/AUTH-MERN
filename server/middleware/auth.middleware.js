const jwt = require("jsonwebtoken")


const userVerify = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.status(400).json({ success: false, message: "Invalid Token!" })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (!decode.id) {
            return res.status(400).json({ success: false, message: "Your not authorized!" })
        } else {
            req.id = decode.id
            next()
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = userVerify