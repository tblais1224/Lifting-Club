//replaces passport

const jwt = require("jsonwebtoken")
const config = require("config")

//middleware function
module.exports = (req, res, next) => {
    //get token from the header using header key
    const token = req.header("x-auth-token")
    //if no token return error
    if (!token) {
        return res.status(401).json({
            msg: "No token, authorization denied"
        })
    }

    //verify the token
    try {
        //decode token
        const decoded = jwt.verify(token, config.get("jwtSecret"))
        //set the user from decoded token
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({
            msg: "Token is not valid"
        })
    }
}