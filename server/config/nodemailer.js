const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASS,
    }
})

module.exports = transporter