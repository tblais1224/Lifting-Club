const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secretOrKey = ("../../config/keys").secretOrKey
const passport = require("passport")

const router = express.router()

//import error handling / validations


//load model
const User = require("../../models/User")

// @route  POST  /api/user/register
// @desc   Register user
// @access  Public
router.post("/register", (req, res) => {
    const {errors, isValid} = validateRegisterInput
    (req.body)
})