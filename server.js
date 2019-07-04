const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")

//  routes
const users = require("./routes/api/users");
// const profiles = require("./routes/api/profiles");

const app = express()

//bodyParser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//passport middleware
app.use(passport.initialize())
//passport configuration
require("./config/passport")(passport)

// get database key
const mongoURI = require("./config/keys").mongoURI

//connect to mongo atlas
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("Successfully connected to Mongo Atlas database."))
    .catch((err) => console.log(err))


// initiate API routes

// ROUTE  http://localhost:5000/api/user
// DESC   register / login / get user info
app.use("/api/user", users)

// ROUTE  http://localhost:5000/api/profile
// DESC   profile / get, post and delete
// app.use("/api/profile", profiles)


app.get("/test", (req, res) => res.send("Hello World, this the Lifting Club Website."))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server is running on port:" + PORT))