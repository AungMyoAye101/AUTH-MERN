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
const unbanned = async (req, res) => {
    const { id } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid userId" })
    }
    try {
        await User.findByIdAndUpdate(id, { isBanned: false }, { new: true })

        return res.status(200).json({ success: true, message: "User unbanned successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to unban users" })
    }
}

const account_appeal = async (req, res) => {
    const { id, about } = req.body
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: process.env.SENDER_EMAIL,
            subject: "Account Appeal.",
            text: `<div><h1>I want to appeal my account that was bannned.</h1><p>${about}</></div>`,
        }
        await transporter.sendMail(mailOptions)
        await User.findByIdAndUpdate(id, { isBanned: true }, { new: true })
        return res.status(200).json({ success: true, message: "Your appeal sent successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Faild to sent appeal." })
    }
}
module.exports = { totalUsers, ban, unbanned, account_appeal }