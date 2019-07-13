const express = require("express")
const router = express.Router()


//@route GET api/liftingPost
//@desc  Test route
//@access  Public
router.get("/",(req,res) => res.send("Lifting post route"))

module.exports = router