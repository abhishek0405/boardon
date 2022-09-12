const express = require("express");
const app = express();
const config = require("../config")[process.env.NODE_ENV || "development"];
const log = config.log();
require("dotenv").config();
const connectDB = require("../config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use((req, res, next) => {
  log.debug(`${req.method}: ${req.url}`);
  return next();
});

const credRoutes = require("./routes/credRoutes");
app.use("/cred", credRoutes);

module.exports = app;
