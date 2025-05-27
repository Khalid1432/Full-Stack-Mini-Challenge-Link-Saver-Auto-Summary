const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateEmail, validatePassword } = require('../utils/validators');

// register handler
exports.register = async (req, res) => {
  try {
    // fetch the data from request body
    const { email, password } = req.body;

    // validation
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    // hash the password
    const hashed = await bcrypt.hash(password, 10);

    //create entry in db
    const user = await User.create({
      email,
      password: hashed
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'User registered failed, Please try again'
    });
  }
}

// loging handler
exports.login = async (req, res) => {
  try {
    // fetch the data from request body
    const { email, password } = req.body;

    // vaidation
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Please Fill up All the Required Fields",
      });
    };

    // Find user with provided email
    const user = await User.findOne({ email });
    //If user not found with provided email
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token after Compare Password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3h"
      });

      user.token = token;
      user.password = undefined;
      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user,
        token
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password Incorrect"
      });
    }
  } catch (error) {
    console.log(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: "Logged in Failed",
    });
  }
}

