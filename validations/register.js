const validator = require("validator")
isEmpty = require("./isEmpty")

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = isEmpty(data.email) ? "" : data.email
    data.password = isEmpty(data.password) ? "" : data.password

    if (!validator.isEmpty(data.name)) {
        errors.name = "Name is required."
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid."
    }
    if (!validator.isEmpty(data.email)) {
        errors.email = "Email is required."
    }
    if (!validator.isEmpty(data.password)) {
        errors.password = "Password is required."
    }
    if (!validator.isEmpty(data.password2)) {
        errors.password2 = "Password confirmation is required."
    }
    if (data.password !== data.password2) {
        errors.password2 = "The password must match the confirmation password."
    }
return {
    errors,
    isValid: isEmpty(errors)
}

}