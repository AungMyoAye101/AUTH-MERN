const { body } = require("express-validator")

const registerSchema = [
    body("name").notEmpty().withMessage("Name is required").isLength({ min: 1 }).withMessage("Name must be at least one characters"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password at least 6 characters long").matches(/[A_Z]/).withMessage("Password must contain one uppercase letter").matches(/[\d]/).withMessage("Password must contain one number")
]
const loginSchema = [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password at least 6 characters long").matches(/[A_Z]/).withMessage("Password must contain one uppercase letter").matches(/[\d]/).withMessage("Password must contain one number")
]
const otpSchema = [
    body('otp').notEmpty().withMessage("OTP is required").isLength({ min: 1, max: 4 }.withMessage("Invalid OTP"))
]

module.exports = { registerSchema, loginSchema, otpSchema }