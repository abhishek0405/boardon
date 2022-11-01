const express = require("express");
const router = express.Router();
const multer = require("multer");
const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const {
  generateCredentialsFromExcel,
} = require("../controllers/credController");

const isCompanyLoggedIn = require("../middleware/isCompanyLoggedIn");

const storageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});
var upload = multer({
  //multer settings
  storage: storageEngine,
});

function validate(req, res, next) {
  if (!req.file) {
    return res.json({
      error: {
        message: "file cant be empty",
      },
    });
  }
  next();
}

router.post(
  "/generateFromSheet",
  upload.single("hireSheet"),
  validate,
  isCompanyLoggedIn,
  generateCredentialsFromExcel
);

module.exports = router;
