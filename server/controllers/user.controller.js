const { default: mongoose } = require("mongoose")
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

const ban = async (req, res) => {
    const { id } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid userId" })
    }
    try {
        await User.findByIdAndUpdate(id, { isBanned: true }, { new: true })

        return res.status(200).json({ success: true, message: "User banned successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to ban users" })
    }
}
module.exports = { totalUsers, ban }