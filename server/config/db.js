import mongoose from "mongoose"

export const connectDB = async () => {
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