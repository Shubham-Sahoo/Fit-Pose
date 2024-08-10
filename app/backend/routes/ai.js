// routes/ai.js
const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Get AI workout recommendation
router.get('/recommendation', auth, (req, res) => {
  // AI recommendation logic
  res.json({ recommendation: 'Based on your activity, try a 30-minute HIIT session.' });
});

module.exports = router;
