const express = require("express");
const docs = require("../models/docs");
const router = express.Router();


const config = require("../config")[process.env.NODE_ENV || "development"];

const log = config.log();
const {
  hrDashboard,
  createChecklist,
  viewChecklist,
  
  getDocs,
  getIndividualDocs,
  postComment,
  

}  = require("../controllers/docsControllerHR");
log.info("hi")


router.get('/hrDashboard', hrDashboard);

router.post('/createChecklist', createChecklist);
router.get('/viewChecklist', viewChecklist);

router.get('/getDocs',getDocs);
router.get('/:username', getIndividualDocs);
router.post('/postComment', postComment);


module.exports = router;
