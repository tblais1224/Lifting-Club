const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlanSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    weeks: [{
        daysOfWeek: [{
            diet: {
                type: Schema.Types.ObjectId,
                ref: "diets"
            },
            workout: {
                type: Schema.Types.ObjectId,
                ref: "workouts"
            },
            description: {
                type: String
            }
        }]
    }],
    ratings: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        rating: {
            type: Number,
            required: true
        }
    }],
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
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Plan = mongoose.model("plan", PlanSchema)