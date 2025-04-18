const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000
        });
        await user.save();

        return res.status(200).json({ success: true, message: "success", user });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password not correct!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000
        });

        return res.status(200).json({ success: true, message: "success", user });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });
        return res.status(200).json({ success: true, message: "success" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    register,
    login,
    logout
};