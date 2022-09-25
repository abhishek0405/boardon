const express = require("express");
const router = express.Router();
const config = require("../../config")[process.env.NODE_ENV || "development"];
const {
  searchDocumentationController,
  suggestionController,
} = require("../controllers/searchController");
const log = config.log();
//verifies if any user is logged in (company or employee)
const isLoggedIn = require("../middleware/isLoggedIn");
router.get("", isLoggedIn, searchDocumentationController);
router.get("/suggest", isLoggedIn, suggestionController);

module.exports = router;
