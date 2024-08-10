// backend/routes/workouts.js
const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

// Add a workout
router.post('/api/workouts', auth, async (req, res) => {
  const { type, duration, caloriesBurned } = req.body;

  const newWorkout = new Workout({
    userId: req.user.id,
    type,
    duration,
    caloriesBurned,
  });

  await newWorkout.save();
  res.json(newWorkout);
});

// Get user workouts
router.get('/', auth, async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id });
  res.json(workouts);
});

module.exports = router;

