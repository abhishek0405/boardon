const express = require("express");
const app = express();

module.exports = (config) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  require("dotenv").config();
  const log = config.log();
  const credRoutes = require("./routes/credRoutes")(log);
  app.use("/cred", credRoutes);

  return app;
};
