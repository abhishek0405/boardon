const express = require("express");
const app = express();
const config = require("../config")[process.env.NODE_ENV || "development"];
const log = config.log();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

const credRoutes = require("./routes/credRoutes");
app.use("/cred", credRoutes);

module.exports = app;
