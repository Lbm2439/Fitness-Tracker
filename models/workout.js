const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter an exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter name of exercise"
        },
        duration: {
          type: Number,
          required: "Enter the duration of the exercise"
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

workoutSchema.methods.setTotalDuration = function() {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
};

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
