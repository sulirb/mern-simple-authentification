// Import required modules and models
const User = require("../../models/SQLUser.js");
const jwt = require("../../managers/jwt.js");
const express = require("express");
const bcrypt = require("bcrypt");
const { HttpError } = require("../../middlewares/error.js");

// Create an Express router
let route = express.Router({ mergeParams: true });

// Define a constant for the login error message
const LOGIN_ERROR = "Incorrect email or password";

// Define the login route
route.post("/", async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Find the user in the database by email
  const user = await User.findOne({ email });

  // If no user is found, throw an authentication error
  if (!user) throw new HttpError(401, LOGIN_ERROR);

  // Compare the provided password with the stored hashed password
  const valid = await bcrypt.compare(password, user.password);

  // If the password is invalid, throw an authentication error
  if (!valid) throw new HttpError(401, LOGIN_ERROR);

  // If authentication is successful, prepare the user ID
  const userId = user._id;

  // Send a successful response with user ID and a signed JWT token
  res.status(200).json({ userId, token: jwt.sign({ userId }) });
});

// Export the router for use in other parts of the application
module.exports = route;
