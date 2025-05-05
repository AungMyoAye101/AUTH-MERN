const { default: mongoose } = require("mongoose")
const User = require("../models/User.model")

const totalUsers = async (req, res) => {
    try {
        const users = await User.find()
        const total = await User.countDocuments()

        return res.status(200).json({ success: true, message: "Get all users", total, users })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to get users" })
    }
}
//check user is authicated

const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.id)
        return res.status(200).json({ success: true, message: "User already logged in", user })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to check current user!" })
    }
}
const getUser = async (req, res) => {
    const { id } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid userId" })
    }
    try {
        const user = await User.findById(id)
        return res.status(200).json({ success: true, message: "User already login", user })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to check current user!" })
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
    const { email, about } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        user.isBanned = false;
        await user.save()


        return res.status(200).json({ success: true, message: "Your appeal sent successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to send appeal." })
    }
}
module.exports = { totalUsers, ban, unbanned, account_appeal, currentUser, getUser }