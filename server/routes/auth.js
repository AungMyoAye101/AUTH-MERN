import express from "express"
import { login, logout, register } from "../controllers/auth.controller.js"

const authRouters = express.Router()
authRouters.post('/register', register)
authRouters.post("/login", login)
authRouters.get('/logout', logout)

export default authRouters