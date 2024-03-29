const express = require("express");
const app = express();
require("dotenv").config();
const config = require("./config")[process.env.NODE_ENV || "development"];
const log = config.log();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const host = process.env.FRONTEND || "http://localhost:3000";
app.use(cors({ credentials: true, origin: host }));
app.set("trust proxy", 1);
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
  // res.header("Access-Control-Allow-Credentials", true);
  // res.header(
  //   "Access-Control-Allow-Methods",
  //   "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  // );
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  // );
  return next();
});
app.use(cookieParser());
app.use("/auth", authRoutes);
module.exports = app;
