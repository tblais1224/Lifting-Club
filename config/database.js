const mongoose = require("mongoose")
const chalk = require("chalk")
//grab key from default.json using config
const config = require("config")
const mongoURI = config.get("mongoURI")

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(chalk.bgCyan.black("Mongo Atlas Connected..."))
    } catch (error) {
        console.error(error.message)
        //escape from process with fail
        process.exit(1)
    }
}

module.exports = connectDB