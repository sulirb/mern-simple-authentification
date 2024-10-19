// Import required modules and models
const User = require("../../models/SQLUser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const express = require("express");
const nodemailer = require("nodemailer");
const { HttpError } = require("../../middlewares/error");

// Create an Express router
let route = express.Router({ mergeParams: true });

// Configure nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // you can choose another mail provider
  port: 465,
  secure: true,
  auth: {
    user: "losc596@gmail.com",
    pass: "tugl ixlt pmzv rkac",
  },
});

// Define the signup route
route.post("/", async (req, res) => {
  try {
    console.log("Starting signup process");
    // Check if a user with the same email address already exists
    /*const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User with the same email address already exists, return an error
      throw new HttpError(400, {
        message: "User with this email address already exists",
      });
    }*/

    // Extract email and password from request body
    const { email, password } = req.body;
    console.log("Received email:", email);

    // Generate a 6-digit verification code
    const verificationCode = crypto.randomInt(100000, 999999);
    console.log("Generated verification code:", verificationCode);

    // Prepare email content with verification code
    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Verification code for your registration",
      html: `
        <h2>Hello,</h2>
        <p>Thank you for registering on our platform! To complete your registration, please use the verification code below:</p>
        <h3 style="color: #4CAF50;">Verification Code: ${verificationCode}</h3>
        <p>We recommend writing this code on paper and deleting the email. Please note that this code will be required for each login to our platform.</p>
        <p>If you didn't request this registration, please ignore this email.</p>
        <p>Thank you for your trust, and we're available for any questions.</p>
        <p>Best regards,<br>[Your Company Name] Team</p>
      `,
    };

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with email, hashed password, and verification code
    const user = new User({
      email,
      password: hashedPassword,
      verificationCode,
    });

    // Save the new user to the database
    await user.save();
    console.log("User saved successfully");

    // Send the verification email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    // Send a success response
    res.status(201).json({
      message: "User created. Check your email for the verification code.",
    });
  } catch (error) {
    // Log any errors and throw an HTTP error
    console.error("Detailed error:", error);
    throw new HttpError(500, { message: "Registration failed" });
  }
});

// Export the router for use in other parts of the application
module.exports = route;
