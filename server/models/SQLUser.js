// Import required modules
const Sequelize = require("sequelize");

const sqlhost = process.env.SQL_HOST;
const sqluser = process.env.SQL_USER;
const sqlpassword = process.env.SQL_PASSWORD;
const sqldb = process.env.SQL_DATABASE;

// Use your existing MySQL connection
const sequelize = new Sequelize(sqldb, sqluser, sqlpassword, {
  host: sqlhost,
  dialect: "mysql",
});

// Define the User model
const User = sequelize.define("User", {
  // ID field: auto-incrementing primary key
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Email field: required and must be unique
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  // Password field: required
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  // Verification code field: required and of type INTEGER
  verificationCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Synchronize the model with the database
User.sync();

// Export the User model
module.exports = User;
