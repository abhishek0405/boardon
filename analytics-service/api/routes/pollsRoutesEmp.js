const express = require("express");
const router = express.Router();

const config = require("../config")[process.env.NODE_ENV || "development"];
const fileUpload = require("express-fileupload");
const upload = require("../config/multer");
const log = config.log();
const isEmployeeLoggedIn = require("../middleware/isEmployeeLoggedIn");
const {
  viewPolls,
  getIndividualPoll,
  submitPoll,
} = require("../controllers/pollsControllerEmp");
const app = require("../app");

router.get("/viewPolls", isEmployeeLoggedIn, viewPolls);
router.get("/:cid/:pollId", isEmployeeLoggedIn, getIndividualPoll);
router.post("/submitPoll", isEmployeeLoggedIn, submitPoll);

//router.post('/updateDocs', updateDocs);

module.exports = router;
