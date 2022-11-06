const express = require("express");
const app = express();
const config = require("./config")[process.env.NODE_ENV || "development"];
const log = config.log();
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
const host = process.env.FRONTEND || "http://localhost:3000";
app.use(cors({ credentials: true, origin: host }));

connectDB();

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
const credRoutes = require("./api/routes/credRoutes");
app.use("/cred", credRoutes);

module.exports = app;
