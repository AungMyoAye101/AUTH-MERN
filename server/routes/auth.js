const express = require("express")
const { login, logout, register, updateUser, verifyEmail, deleteAccount, verifyOTP, sendOTP, findAccountSendOTP, passwordReset } = require("../controllers/auth.controller.js")
const userVerify = require("../middleware/auth.middleware.js")
const { registerSchema, loginSchema, otpSchema } = require("../config/validator.js")

const authRouter = express.Router()

authRouter.post('/register', registerSchema, register)
authRouter.post("/login", loginSchema, login)
authRouter.post('/logout', logout)
authRouter.put('/update/:id', updateUser)
authRouter.post('/verify', userVerify, sendOTP)
authRouter.post('/verify_account', userVerify, otpSchema, verifyEmail)
authRouter.post('/find_account', findAccountSendOTP)
authRouter.post('/forgot_password/otp_verify', userVerify, otpSchema, verifyOTP)
authRouter.post('/reset_password', userVerify, passwordReset)
authRouter.delete('/delete_account', userVerify, deleteAccount)


module.exports = authRouter