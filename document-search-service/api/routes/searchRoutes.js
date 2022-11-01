const express = require("express");
const router = express.Router();
const config = require("../../config")[process.env.NODE_ENV || "development"];
const {
  searchDocumentationController,
  suggestionController,
  searchAllController,
  searchDocumentByIdController,
} = require("../controllers/searchController");
const log = config.log();
//verifies if any user is logged in (company or employee)
const isLoggedIn = require("../middleware/isLoggedIn");
router.get("", isLoggedIn, searchDocumentationController);
router.get("/suggest", isLoggedIn, suggestionController);
router.get("/all", isLoggedIn, searchAllController);
router.get("/:id", isLoggedIn, searchDocumentByIdController);

module.exports = router;
