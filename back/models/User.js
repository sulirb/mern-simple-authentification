// Import required modules
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Define the User schema
const userSchema = mongoose.Schema({
  // Email field: required and must be unique
  email: { type: String, required: true, unique: true },

  // Password field: required
  password: { type: String, required: true },

  // Verification code field: required and of type Number
  verificationCode: { type: Number, required: true },
});

// Apply the uniqueValidator plugin to userSchema
// This will add pre-save validation for unique fields within a Mongoose schema
userSchema.plugin(uniqueValidator);

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
