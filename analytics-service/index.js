const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config")[process.env.NODE_ENV || "development"];
const log = config.log();
const path = require("path");

const fileUpload = require("express-fileupload");
app.use(express.json());
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(express.static(path.join(__dirname, "public")));
require("dotenv").config();
const connectDB = require("./api/config/db");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
connectDB();
const host = process.env.FRONTEND || "http://localhost:3000";
app.use(cors({ credentials: true, origin: host }));
app.use((req, res, next) => {
  log.debug(`${req.method}: ${req.url}`);
  return next();
});

const pollRoutesHR = require("./api/routes/pollsRoutesHR");
const pollRoutesEmp = require("./api/routes/pollsRoutesEmp");
app.use(cookieParser());
app.use("/hr", pollRoutesHR);
app.use("/emp", pollRoutesEmp);

module.exports = app;
