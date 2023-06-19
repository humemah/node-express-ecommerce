const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const { createSuccessResponse, createErrorResponse } = require('../responseUtils');

// User Registration
exports.registerUser = async (req, res) => {
  try {
    // Extract user information from request body
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json(createErrorResponse('Email already registered'));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response
    res.status(201).json(createSuccessResponse('User registered successfully'));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
};
// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user based on the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(createErrorResponse('Invalid credentials'));
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(createErrorResponse('Invalid credentials'));
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secretKey, // Replace with your own secret key
      { expiresIn: '1h' } // Set the expiration time for the token
    );

    // Return the token to the client
    res.json(createSuccessResponse(token));
  } catch (err) {
    res.status(500).json(createErrorResponse(err.message));
  }
};

// Token Authentication
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401); // Unauthorized
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.status(403).json(createErrorResponse(err.message));
      return; // Forbidden
    }

    req.user = user; // Store the authenticated user information
    next();
  });
};
function isPasswordComplex(password) {
  // Password should contain at least 8 characters
  if (password.length < 8) {
    return false;
  }

  // Password should include a combination of letters, numbers, and special characters
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  return passwordRegex.test(password);
}