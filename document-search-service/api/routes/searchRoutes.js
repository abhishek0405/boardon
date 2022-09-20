const express = require("express");
const router = express.Router();
const config = require("../../config")[process.env.NODE_ENV || "development"];
const { searchDocumentation } = require("../controllers/searchController");
const log = config.log();

router.get("", searchDocumentation);

module.exports = router;
