const express = require("express")
const { login, logout, register, updateUser, verifyEmail, currentUser, deleteAccount, forgotPassword, verifyOTP, sendOTP, findAccoundSendOTP, passwordReset } = require("../controllers/auth.controller.js")
const userVerify = require("../middleware/auth.middleware.js")

const authRouter = express.Router()
authRouter.post('/register', register)
authRouter.post("/login", login)
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