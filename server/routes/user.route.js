const { ban, unbanned, account_appeal, totalUsers } = require("../controllers/user.controller")
const userVerify = require("../middleware/auth.middleware")

const userRouter = require("express").Router()

userRouter.get('/users', userVerify, totalUsers)
userRouter.post('/ban', userVerify, ban)
userRouter.post('/unban', userVerify, unbanned)
userRouter.post('/appeal', account_appeal)

module.exports = userRouter