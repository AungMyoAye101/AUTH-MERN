const express = require("express")
const { login, logout, register, updateUser, otpVerify, verifyEmail, currentUser } = require("../controllers/auth.controller.js")
const userVerify = require("../middleware/auth.middleware.js")

const authRouter = express.Router()
authRouter.post('/register', register)
authRouter.post("/login", login)
authRouter.post('/logout', logout)
authRouter.put('/update/:id', updateUser)
authRouter.post('/verify', userVerify, otpVerify)
authRouter.post('/verify_email', userVerify, verifyEmail)
authRouter.post('/me', userVerify, currentUser)

module.exports = authRouter