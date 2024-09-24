// Import required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const helmet = require("helmet");
require("express-async-errors"); // Handle async errors in Express
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const { errorMiddleware } = require("./middlewares/error.js");

// Create an Express application
const app = express();

// Get MongoDB connection string from environment variables
const mongoDatabase = process.env.MONGODB_NAME;

// Connect to MongoDB
mongoose
  .connect(mongoDatabase)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((error) => console.log("Failed to connect to MongoDB: " + error));

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Sanitize data to prevent MongoDB Operator Injection
app.use(errorMiddleware); // Custom error handling middleware

// Import and use application routes
const routes = require("./router/index.js");
app.use("/", routes);

// Export the configured Express application
module.exports = app;
