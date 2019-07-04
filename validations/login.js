const validator = require("validator")
const isEmpty = require("./isEmpty")

module.exports = function validateLoginInput(data){
    let errors = {}

    data.name = isEmpty(data.name) ? "" : data.name
    data.email = isEmpty(data.email) ? "" : data.email
    data.password = isEmpty(data.password) ? "" : data.password

    if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid!"
    }
    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required."
    }
    if(validator.isEmpty(data.name)){
        errors.name = "Email field is required."
    }
}