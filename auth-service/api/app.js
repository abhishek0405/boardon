const express = require("express");
const app = express();
const config = require("../config")[process.env.NODE_ENV || "development"];
const log = config.log();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*

Local mongoDB

To start : brew services start mongodb-community@5.0

To stop : brew services stop mongodb-community@5.0

*/

app.use((req, res, next) => {
  log.debug(`${req.method}: ${req.url}`);
  return next();
});

module.exports = app;
