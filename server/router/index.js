const express = require("express");

const router = express.Router();

// routes
router.use("/auth/login", require("../api/auth/login.js"));
router.use("/auth/signup", require("../api/auth/signup.js"));

module.exports = router;
