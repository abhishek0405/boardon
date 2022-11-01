const express = require("express");
const app = express();
require("dotenv").config();
const config = require("./config")[process.env.NODE_ENV || "development"];
const log = config.log();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require("./api/routes/authRoute");
const connectDB = require("./config/db");
connectDB();
/*

Local mongoDB

To start : brew services start mongodb-community@5.0

To stop : brew services stop mongodb-community@5.0

*/

app.use((req, res, next) => {
  log.debug(`${req.method}: ${req.url}`);
  return next();
});
app.use(cookieParser());
app.use("/auth", authRoutes);
module.exports = app;
