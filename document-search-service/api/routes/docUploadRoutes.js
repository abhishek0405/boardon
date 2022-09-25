const express = require("express");
const router = express.Router();
const config = require("../../config")[process.env.NODE_ENV || "development"];
const { uploadDocumentation } = require("../controllers/docUploadController");
const log = config.log();
const { isLoggedIn } = require("../middleware/isLoggedIn");
router.post("", isLoggedIn, uploadDocumentation);

module.exports = router;
