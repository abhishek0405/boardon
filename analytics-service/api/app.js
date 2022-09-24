const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const path = require('path');
const fileUpload = require('express-fileupload');
//app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


const connectDB = require("./config/db");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
connectDB();

app.use((req, res, next) => {
  log.debug(`${req.method}: ${req.url}`);
  return next();
});


const docsRoutesHR = require("./routes/pollsRoutesHR");
const docsRoutesEmp = require("./routes/pollsRoutesEmp");

app.use("/hr", docsRoutesHR);
app.use("/emp", docsRoutesEmp);

module.exports = app;