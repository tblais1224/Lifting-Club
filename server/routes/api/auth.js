const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const User = require("../../models/User")
const {
    check,
    validationResult
} = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")
const bcrypt = require("bcryptjs")

//@route GET api/auth
//@desc  get user data excluding password
//@access  private
//using auth in params will make route password protected
router.get("/", auth, async (req, res) => {
    try {
        //sending in user data from decoded token, -password will not send password with data
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

//@route POST api/auth
//@desc  login User
//@access  Public
router.post(
    "/",
    [
        check("email", "A valid email is required").isEmail(),
        check("password", "Password required").exists()
    ],
    async (req, res) => {
        //express validator
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {
            email,
            password
        } = req.body

        try {
            //check for user
            let user = await User.findOne({
                email
            })

            if (!user) {
                res.status(400).json({
                    errors: [{
                        msg: "Invalid credentials"
                    }]
                })
            }
            //check if password matches
            const isMatch = await bcrypt.compare(password, user.password)
            //use same error for email and password as better security than using different message
            if (!isMatch) {
                res.status(400).json({
                    errors: [{
                        msg: "Invalid credentials"
                    }]
                })
            }

            //payload for jwt token
            const payload = {
                user: {
                    //mongoose knows to use _id
                    id: user.id
                }
            }

            jwt.sign(payload, config.get("jwtSecret"), {
                expiresIn: 5000
            }, (err, token) => {
                if (err) throw err
                res.json({
                    token
                })
            })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("server error")
        }
    }
)

module.exports = router