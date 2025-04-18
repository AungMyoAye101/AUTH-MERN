const express = require("express")
const { login, logout, register } = require("../controllers/auth.controller.js")

const authRouter = express.Router()
authRouter.post('/register', register)
authRouter.post("/login", login)
authRouter.post('/logout', logout)

module.exports = authRouter