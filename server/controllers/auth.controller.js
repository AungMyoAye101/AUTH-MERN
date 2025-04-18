import jwt from "jsonwebtoken"
import User from "../models/User.model.js"
import bcrypt from "bcryptjs"


export const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exist!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000

        })

        return res.status(200).json({ success: true, message: "success" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}
export const login = async (req, res) => {
    try {

        return res.status(200).json({ success: true, message: "success" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}
export const logout = async (req, res) => {
    try {

        return res.status(200).json({ success: true, message: "success" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}