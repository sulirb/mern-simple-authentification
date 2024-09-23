const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
require("express-async-errors");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const { errorMiddleware } = require("./middlewares/error.js");

const app = express();

const mongoDatabase = process.env.MONGODB_NAME;

mongoose
  .connect(mongoDatabase, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !" + error));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());
app.use(errorMiddleware);
const routes = require("./router/index.js");
app.use("/", routes);

module.exports = app;
