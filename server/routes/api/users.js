const express = require("express")
const router = express.Router()
const {
    check,
    validationResult
} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

//import models
const User = require("../../models/User")

//make sure headers has Content-Type = application/json

//@route POST api/users
//@desc  Register User
//@access  Public
router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please use a valid email").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({
            min: 6
        }),
        check("password2").custom((value, {
            req
        }) => {
            if (value !== req.body.password) {
                throw new Error("Confirmation field must match the password field")
            } else {
                return true
            }
        })
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
            name,
            email,
            password
        } = req.body

        try {
            let user = await User.findOne({
                email
            })

            if (user) {
                res.status(400).json({
                    errors: [{
                        msg: "User already exists"
                    }]
                })
            }
            //set req.body to new user model
            user = new User({
                name,
                email,
                password
            })
            //create a salt
            const salt = await bcrypt.genSalt(10)
            //create hashed salt and store it in model password key
            user.password = await bcrypt.hash(password, salt)
            //save to db
            await user.save()

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
    })



module.exports = router