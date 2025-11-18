const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// ----------------------
// REGISTER USER
// ----------------------
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, mobileNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      mobileNumber,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----------------------
// LOGIN USER
// ----------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
       process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};





module.exports = { registerUser, loginUser};
