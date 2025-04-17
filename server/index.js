import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

dotenv.config()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true }))



app.get('/', (req, res) => res.send("Server is alive."))
app.listen(port, () => console.log("Server is listening on port " + port))

