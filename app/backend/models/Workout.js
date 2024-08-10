// backend/models/Workout.js
const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  caloriesBurned: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Workout', WorkoutSchema);

