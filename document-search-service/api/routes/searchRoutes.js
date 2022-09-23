const express = require("express");
const router = express.Router();
const config = require("../../config")[process.env.NODE_ENV || "development"];
const {
  searchDocumentationController,
  suggestionController,
} = require("../controllers/searchController");
const log = config.log();

router.get("", searchDocumentationController);
router.get("/suggest", suggestionController);

module.exports = router;
