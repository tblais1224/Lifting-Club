const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  social: {
    instagramURL: {
      type: String
    },
    youtubeURL: {
      type: String
    },
    otherURL: {
      type: String
    }
  },
  sex: {
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
      type: String,
      required: true
    },
    weight: {
      type: String,
      required: true
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
    bodyFatIndex: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  bodyMeasurementGoals: [{
    weight: {
      type: String,
      required: true
    },
    bodyFatIndex: {
      type: String,
      required: true
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
    goalDate: {
      type: Date,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  certifications: [{
    certification: {
      type: String
    }
  }],
  favoriteGym: {
    type: String
  },
  following: [{
    diet: {
      type: Schema.Types.ObjectId,
      ref: "diets"
    },
    workout: {
      type: Schema.Types.ObjectId,
      ref: "workouts"
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "plans"
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);