const express = require("express");
const router = express.Router();

module.exports = (log) => {
  const { credServices } = require("../controllers/credController")(log);

  router.post("/generate", credServices.generateCredentials);

  router.post("/generateFromSheet", credServices.generateCredentialsFromExcel);
  return router;
};
