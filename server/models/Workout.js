const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
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
  muscleGroups: [
    {
      group: {
        type: String,
        required: true
      }
    }
  ],
  exercises: [
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      sets: [
        {
          reps: {
            type: Number,
            required: true
          },
          restTime: {
            type: String
          }
        }
      ]
    }
  ],
  reviews: [{
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    rating: {
        type: Number,
        required: true
    },
    text: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}],
  comments: [
    {
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
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Workout = mongoose.model("workout", WorkoutSchema);
