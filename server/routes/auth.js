const express = require("express")
const { login, logout, register, updateUser } = require("../controllers/auth.controller.js")
const userVerify = require("../middleware/auth.middleware.js")

const authRouter = express.Router()
authRouter.post('/register', register)
authRouter.post("/login", login)
authRouter.post('/logout', logout)
authRouter.put('/update/:id', updateUser)
authRouter.post('/verify', userVerify, (req, res) => {
    console.log(req.id)
    return res.status(200).json({ message: 'Verification successful', id: req.id })
})

module.exports = authRouter