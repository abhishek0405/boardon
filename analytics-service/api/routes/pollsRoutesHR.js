const express = require("express");
const docs = require("../models/docs");
const router = express.Router();


const config = require("../config")[process.env.NODE_ENV || "development"];

const log = config.log();
const {
  hrDashboard,
  getPolls,
  createPoll,
  getIndividualPoll,
  addQuestion,
  postPoll,
  viewAllresults

}  = require("../controllers/pollsControllerHR");
log.info("hi")


router.get('/hrDashboard', hrDashboard);
router.get('/polls', getPolls);
router.post('/createPoll', createPoll)
router.get('/:cid/:pollId', getIndividualPoll)
router.post('/addQuestion', addQuestion)
router.post('/postPoll', postPoll)
router.get('/viewAllresults', viewAllresults)

module.exports = router;
