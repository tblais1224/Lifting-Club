const mongoose = require("mongoose")

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
})

module.exports = Workout = mongoose.model("workout", WorkoutSchema)