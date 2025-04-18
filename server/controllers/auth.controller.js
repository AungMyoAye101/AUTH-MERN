const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const { mongoose } = require("mongoose");
const transporter = require("../config/nodemailer.js");

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

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Simple Auth.",
            text: `Hello, Nice to meet you ${name}.Your account has been created. Thanks you choosing our website.`,
        }
        await transporter.sendMail(mailOptions)

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

//user logout

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });
        return res.status(200).json({ success: true, message: "User has been logout !" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//user update
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "User id is not valid!" });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedUser) {
            return res.status(400).json({ success: false, message: "User is not valid!" });
        }
        return res.status(200).json({ success: true, message: "User has been updated.", user: updatedUser });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const otpVerify = async (req, res) => {
    const id = req.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "User id is not valid!" });
    }
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpireIn = new Date(Date.now() + 3 * 60 * 1000)

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Simple Auth OTP",
            text: `<div><h1>Hello, ${user.name}</h1> <h2>Your Otp is <b>${otp}</b> expires in 3 minutes.</h2><p>Don't share anyone.</p>
            <p><i>Thanks you</i> choosing our website.</p></div>`,
        }
        await transporter.sendMail(mailOptions)

        user.verifyOtp = otp;
        user.otpExpireIn = otpExpireIn;
        await user.save()

        return res.status(200).json({ success: true, message: "Verification code has been send" });


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
module.exports = {
    register,
    login,
    logout,
    updateUser,
    otpVerify
};