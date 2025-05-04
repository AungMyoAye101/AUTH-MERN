const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const { mongoose } = require("mongoose");
const transporter = require("../config/nodemailer.js");
const { validationResult } = require("express-validator")

const register = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        return res.status(400).json({ success: false, message: errors.array() });
    }
    const { name, email, password } = req.body;


    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        await user.save();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Simple Auth.",
            text: `Hello, Nice to meet you ${name}. Your account has been created. Thank you for choosing our website.`,
        }
        await transporter.sendMail(mailOptions)

        return res.status(201).json({ success: true, message: "Account created successfully", user });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array() })
    }
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("logo", user)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        if (user.isBanned) {
            return res.status(400).json({ success: false, message: "Sorry, your account has been banned! Please contact customer service." });
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

        return res.status(200).json({ success: true, message: "Login successfull", user });

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

//send OTP code to user 
const sendOTP = async (req, res) => {
    const id = req.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "User id is not valid!" });
    }
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000)
        const otpExpireIn = new Date(Date.now() + 5 * 60 * 1000)

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Simple Auth OTP",
            text: `<div><h1>Hello, ${user.name}</h1> <h2>Your OTP is <b>${otp}</b> expires in 5 minutes.</h2><p>Don't share anyone.</p>
            <p><i>Thank you for</i> choosing our website.</p></div>`,
        }
        await transporter.sendMail(mailOptions)

        user.verifyOtp = otp;
        user.otpExpireIn = otpExpireIn;
        await user.save()

        return res.status(200).json({ success: true, message: "Verification code has been send", user });


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

//verify email 
const verifyEmail = async (req, res) => {
    const id = req.id
    const { otp } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user id!" })
    }
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" })
        }
        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "User account is already verified!" })
        }
        if (Date.now() > user.otpExpireIn) {
            return res.status(400).json({ success: false, message: "Your OTP is expired!" })
        }

        if (otp !== user.verifyOtp) {
            return res.status(400).json({ success: false, message: "Your OTP is not correct!" })
        }
        user.isVerified = true;

        await user.save()
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verify Notification",
            text: `<div><h1>Hello, ${user.name}</h1> <h2>Your account has been verified.</h2><p>Now,you can you use all features in our site</p>
            <p><i>Thank you for</i> choosing our website.</p></div>`,
        }
        await transporter.sendMail(mailOptions)
        return res.status(200).json({ success: true, message: "Your account has been verified!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to verify email!" })
    }
}

//check user is authicated

const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.id)
        return res.status(200).json({ success: true, message: "User already login", user })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to check current user!" })
    }
}

const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.id)
        return res.status(200).json({ success: true, message: "Account deleted!", })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to delete account!" })
    }
}

//Forgot password 

const findAccountSendOTP = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ success: false, message: "email is required!" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" })
        }
        const otp = Math.floor(100000 + Math.random() * 900000)
        const otpExpireIn = new Date(Date.now() + 5 * 60 * 1000)

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Recovery",
            text: `<div><h1>Hello, ${user.name}</h1> <h2>Your OTP is <b>${otp}</b> expires in 5 minutes.</h2><p>Don't share anyone.</p>
            <p><i>Thank you for</i> choosing our website.</p></div>`,
        }
        user.verifyOtp = otp;
        user.otpExpireIn = otpExpireIn;
        await user.save()
        await transporter.sendMail(mailOptions)
        return res.status(200).json({ success: true, message: "Password reset OTP is sent!", userId: user._id })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to reset password account!" })
    }
}

const verifyOTP = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array() })
    }
    const { otp, userId } = req.body
    try {
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" })
        }
        if (Date.now() > user.otpExpireIn) {
            return res.status(400).json({ success: false, message: "Your OTP is expired!" })
        }
        if (otp !== user.verifyOtp) {
            return res.status(400).json({ success: false, message: "Your OTP is not correct!" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000
        });
        return res.status(200).json({ success: true, message: "Verify OTP success" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to verify OTP!" })
    }
}

const passwordReset = async (req, res) => {
    const { password, id } = req.body

    console.log(password, id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user id!" })
    }


    try {
        const hashed = await bcrypt.hash(password, 10)
        console.log("hashing...", hashed)
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        console.log('user')
        console.log(user)
        user.password = hashed
        await user.save()
        console.log(user)
        return res.status(200).json({ success: true, message: "New password already set", user })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to reset password" })
    }
}

module.exports = {
    register,
    login,
    logout,
    updateUser,
    sendOTP,
    verifyEmail,
    currentUser,
    deleteAccount,
    findAccountSendOTP,
    verifyOTP,
    passwordReset
};