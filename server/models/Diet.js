const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DietSchema = new Schema({
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
    calorieGoal: {
        type: String
    },
    carbohydrateGoal: {
        type: String
    },
    proteinGoal: {
        type: String
    },
    fatGoal: {
        type: String
    },
    dailyMeals: [{
        name: {
            type: String
        },
        description: {
            type: String
        },
        calories: {
            type: String
        },
        carbohydrates: {
            type: String
        },
        proteins: {
            type: String
        },
        fats: {
            type: String
        },
        foods: [{
            name: {
                type: String
            },
            quantity: {
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

module.exports = Diet = mongoose.model("diet", DietSchema)