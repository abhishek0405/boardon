const express = require("express");
const router = express.Router();
const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const {
  generateCredentials,
  generateCredentialsFromExcel,
} = require("../controllers/credController");

router.post("/generate", generateCredentials);

router.post("/generateFromSheet", generateCredentialsFromExcel);

module.exports = router;
