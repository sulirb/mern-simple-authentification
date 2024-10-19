// Load environment variables from .env file
require("dotenv").config();

// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Get JWT secret and expiration time from environment variables
const sectok = process.env.JWT_SECRET;
const exptok = process.env.JWT_EXPIRE;

// Function to verify a JWT token
const verify = (token) => jwt.verify(token, sectok);

// Function to sign (create) a new JWT token
const sign = (data) => jwt.sign(data, sectok, { expiresIn: exptok });

// Export the verify and sign functions
module.exports = { verify, sign };
