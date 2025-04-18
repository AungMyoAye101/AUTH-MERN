const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/auth.js");

const app = express();

dotenv.config();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Auth routes
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => res.send("Server is alive."));
app.listen(port, () => console.log("Server is listening on port " + port));

module.exports = app