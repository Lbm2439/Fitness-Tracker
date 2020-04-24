const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    enum: ["cardio", "resistance"],
    required: "Please select an exercise type"
  },
  duration: {
    type: Number,
    required: "Duration is required",
    min: 1
  },
  name: {
    type: String,
    trim: true,
    minlength: 1,
    required: "Please enter a name"
  },
  weight: {
    type: Number,
    min: 0
  },
  reps: {
    type: Number,
    min: 0
  },
  sets: {
    type: Number,
    min: 0
  },
  distance: {
    type: Number,
    min: 0
  }
});

module.exports = ExerciseSchema;