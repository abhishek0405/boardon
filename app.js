const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Welcome home");
});

module.exports = app;
