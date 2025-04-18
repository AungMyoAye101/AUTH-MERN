require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = async () => {
    const url = process.env.MONGODB_URI
    if (!url) {
        throw new Error("Database url is invalid!")
    }
    try {
        mongoose.connect(url).then(() => console.log("Database connected successfull!"))

    } catch (error) {
        console.error("Database disconnected!")
        process.exit(1)
    }

}
module.exports = connectDB