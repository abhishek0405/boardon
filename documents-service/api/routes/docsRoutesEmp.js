const express = require("express");
const router = express.Router();
const config = require("../config")[process.env.NODE_ENV || "development"];
const fileUpload = require("express-fileupload");
const upload = require("../config/multer");
const log = config.log();

const {
  empDashboard,
  viewChecklist,
  uploadDocs,
} = require("../controllers/docsControllerEmp");

router.get("/empDashboard", empDashboard);
router.get("/viewChecklist", viewChecklist);
router.post("/uploadDocs", upload.single("file"), uploadDocs);

//router.post('/updateDocs', updateDocs);

module.exports = router;
