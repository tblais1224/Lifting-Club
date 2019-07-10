//initiate express
const express = require("express")
const app = express()
const chalk = require("chalk")
//connect mongodb
// const connectDB = require("./config/database")()

//init middleware
//values can only be strings or arrays when set to false
app.use(express.json({
    extended: false
}))

app.use("/", (req, res) => res.send("haydens a bitch"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(chalk.bgGreen.black("Server connected on port: " + PORT)))