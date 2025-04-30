const express = require("express")
const { login, logout, register, updateUser, verifyEmail, currentUser, deleteAccount, forgotPassword, verifyOTP, sendOTP, findAccoundSendOTP, passwordReset } = require("../controllers/auth.controller.js")
const userVerify = require("../middleware/auth.middleware.js")
const { body } = require("express-validator")
const authRouter = express.Router()
authRouter.post('/register', [
    body('name').notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password at least 6 characters long.")
], register)
authRouter.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password at least 6 characters long")
], login)
authRouter.post('/logout', logout)
authRouter.put('/update/:id', updateUser)
authRouter.post('/verify', userVerify, sendOTP)
authRouter.post('/verify_account', userVerify, verifyEmail)
authRouter.post('/me', userVerify, currentUser)
authRouter.post('/find_account', findAccoundSendOTP)
authRouter.post('/forgot_password/otp_verify', verifyOTP)
authRouter.post('/reset_password', passwordReset)
authRouter.delete('/delete_account', userVerify, deleteAccount)

module.exports = authRouter