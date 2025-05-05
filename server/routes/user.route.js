const { ban, unbanned, account_appeal, totalUsers, getUser, currentUser } = require("../controllers/user.controller")
const userVerify = require("../middleware/auth.middleware")

const userRouter = require("express").Router()

userRouter.get('/users', userVerify, totalUsers)
userRouter.post('/ban', userVerify, ban)
userRouter.post('/unban', userVerify, unbanned)
userRouter.post('/appeal', account_appeal)
userRouter.get('/me', userVerify, currentUser)
userRouter.post('/getUser', getUser)

module.exports = userRouter