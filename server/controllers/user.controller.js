const User = require("../models/User.model")

const totalUsers = async (req, res) => {
    try {
        const users = await User.find()
        const total = await User.countDocuments()

        return res.status(200).json({ success: true, message: "Get all users", total, users })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Faild to get users" })
    }
}
module.exports = { totalUsers }