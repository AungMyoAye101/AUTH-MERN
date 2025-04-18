const express = require("express")
const { login, logout, register, updateUser } = require("../controllers/auth.controller.js")

const authRouter = express.Router()
authRouter.post('/register', register)
authRouter.post("/login", login)
authRouter.post('/logout', logout)
authRouter.put('/update/:id', updateUser)

module.exports = authRouter