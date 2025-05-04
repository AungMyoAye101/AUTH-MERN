const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.route.js")

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;
connectDB();
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//     });
// }


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));

// Auth routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/account', userRouter);

app.get('/', (req, res) => res.send("Server is alive."));
app.listen(port, () => console.log("Server is listening on port " + port));

module.exports = app