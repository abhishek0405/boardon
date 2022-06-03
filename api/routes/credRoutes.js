const express = require("express");
const router = express.Router();
const {
  generateCredentials,
  generateCredentialsFromExcel,
} = require("../controllers/credController");

router.post("/generate", generateCredentials);

router.post("/generateFromSheet", generateCredentialsFromExcel);

module.exports = router;
