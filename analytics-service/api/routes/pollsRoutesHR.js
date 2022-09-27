const express = require("express");
const docs = require("../models/docs");
const router = express.Router();

const config = require("../config")[process.env.NODE_ENV || "development"];
const isCompanyLoggedIn = require("../middleware/isCompanyLoggedIn");
const log = config.log();
const {
  hrDashboard,
  getPolls,
  createPoll,
  getIndividualPoll,
  addQuestion,
  postPoll,
  viewAllresults,
} = require("../controllers/pollsControllerHR");
log.info("hi");

router.get("/hrDashboard", isCompanyLoggedIn, hrDashboard);
router.get("/polls", isCompanyLoggedIn, getPolls);
router.post("/createPoll", isCompanyLoggedIn, createPoll);
router.get("/:cid/:pollId", isCompanyLoggedIn, getIndividualPoll);
router.post("/addQuestion", isCompanyLoggedIn, addQuestion);
router.post("/postPoll", isCompanyLoggedIn, postPoll);
router.get("/viewAllresults", isCompanyLoggedIn, viewAllresults);

module.exports = router;
