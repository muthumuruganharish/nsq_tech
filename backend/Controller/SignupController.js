const bcrypt = require('bcrypt');
const User = require('../Model/User');

// POST /signup
const signup = async (req, res) => {
   
  try {
    const { username, email, password, role } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(409).json({ message: 'Username or email already taken.' });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPwd,
      role: role || 'General User',
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

module.exports = { signup };