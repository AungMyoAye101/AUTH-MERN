import express from "express"
import dotenv from "dotenv"
import cors from "cors"

const app = express()

dotenv.config()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors, { credients: true })

app.listen(port, () => console.log("Server is listening on port " + port))

