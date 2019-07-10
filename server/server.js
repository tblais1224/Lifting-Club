//initiate express
const express = require("express")
const app = express()
const chalk = require("chalk")
//connect mongodb
const connectDB = require("../config/database")
connectDB()

//init middleware   instead of bodyparser
//values can only be strings or arrays when set to false
app.use(express.json({
    extended: false
}))

//define api routes
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/users", require("./routes/api/users"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/liftingPost", require("./routes/api/liftingPost"))
app.use("/api/dietPost", require("./routes/api/dietPost"))

// app.use("/", (req, res) => res.send("haydens a bitch"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(chalk.bgGreen.black("Server connected on port: " + PORT)))