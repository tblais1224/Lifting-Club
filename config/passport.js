const {
    Strategy,
    ExtractJwt
} = require("passport-jwt")
const mongoose = require("mongoose")
const User = mongoose.model("users")
const secretOrKey = require("../config/keys").secretOrKey

const opts = {}
//token will be passed in header
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secretOrKey

//use secret to test if token is valid
module.exports = passport => {
    passport.use(new Strategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(user => {
                //if user is found return it else return false
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
            .catch(err => console.log(err))
    }))
}