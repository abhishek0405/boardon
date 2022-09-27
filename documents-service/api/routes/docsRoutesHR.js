const express = require("express");
const docs = require("../models/docs");
const router = express.Router();
const isCompanyLoggedIn = require("../middleware/isCompanyLoggedIn");

const config = require("../config")[process.env.NODE_ENV || "development"];

const log = config.log();
const {
  hrDashboard,
  createChecklist,
  viewChecklist,
  updateChecklist,
  getDocs,
  getIndividualDocs,
  postComment,
} = require("../controllers/docsControllerHR");
log.info("hi");

router.get("/hrDashboard", isCompanyLoggedIn, hrDashboard);

router.post("/createChecklist", isCompanyLoggedIn, createChecklist);
//check
router.get("/viewChecklist", isCompanyLoggedIn, viewChecklist);
router.post("/updateChecklist", isCompanyLoggedIn, updateChecklist);
router.get("/getDocs", isCompanyLoggedIn, getDocs);
router.get("/:username", isCompanyLoggedIn, getIndividualDocs);
router.post("/postComment", isCompanyLoggedIn, postComment);

module.exports = router;
