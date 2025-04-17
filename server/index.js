import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db.js"
import authRouters from "./routes/auth.js"

const app = express()

dotenv.config()
const port = process.env.PORT || 4000
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true }))

// Auth routes

app.use('/api/v1', authRouters)

app.get('/', (req, res) => res.send("Server is alive."))
app.listen(port, () => console.log("Server is listening on port " + port))

