const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    social: {
        instagramURL: {
            type: String
        },
        youtubeURL: {
            type: String
        }
    },
    sexualOrientation: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    //keep record of measurements to show progress over time
    bodyMeasurements: [{
        height: {
            type: String
        },
        weight: {
            type: String
        },
        leftThigh: {
            type: String
        },
        rightThigh: {
            type: String
        },
        leftCalf: {
            type: String
        },
        rightCalf: {
            type: String
        },
        chestBack: {
            type: String
        },
        leftArm: {
            type: String
        },
        rightArm: {
            type: String
        },
        leftForearm: {
            type: String
        },
        rightForearm: {
            type: String
        },
        waist: {
            type: String
        },
        date: {
            type: Date,
            default: Data.now
        }
    }],
    bodyMeasurementGoal: {
        height: {
            type: String
        },
        weight: {
            type: String
        },
        leftThigh: {
            type: String
        },
        rightThigh: {
            type: String
        },
        leftCalf: {
            type: String
        },
        rightCalf: {
            type: String
        },
        chestBack: {
            type: String
        },
        leftArm: {
            type: String
        },
        rightArm: {
            type: String
        },
        leftForearm: {
            type: String
        },
        rightForearm: {
            type: String
        },
        waist: {
            type: String
        },
        date: {
            type: Date,
            default: Data.now
        }
    },
})