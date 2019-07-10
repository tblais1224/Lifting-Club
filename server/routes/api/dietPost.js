const express = require("express")
const router = express.Router()


//@route GET api/dietPost
//@desc  Test route
//@access  Public
router.get("/",(req,res) => res.send("Diet post route"))

module.exports = router