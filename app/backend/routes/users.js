// backend/routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: 'User already exists' });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  // Create token
  const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'User does not exist' });

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  // Create token
  const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;

