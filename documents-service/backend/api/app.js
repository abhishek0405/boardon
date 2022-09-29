const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors')
//app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
const connectDB = require("./config/db");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
//app.set("view engine", "ejs")
connectDB();

app.use((req, res, next) => {
  log.debug(`${req.method}: ${req.url}`);
  return next();
});


const docsRoutesHR = require("./routes/docsRoutesHR");
const docsRoutesEmp = require("./routes/docsRoutesEmp");

app.use("/hr", docsRoutesHR);
app.use("/emp", docsRoutesEmp);

module.exports = app;