const mongoose = require("mongoose");

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
    },
    otherURL: {
      typr: String
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
  bodyMeasurements: [
    {
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
      bodyFatIndex: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  bodyMeasurementGoal: {
    weight: {
      type: String
    },
    bodyFatIndex: {
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
    goalDate: {
      type: Date
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  certifications: [
    {
      certification: {
        type: String
      }
    }
  ],
  favoriteGym:{
      type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
