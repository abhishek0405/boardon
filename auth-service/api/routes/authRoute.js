const express = require("express");
const router = express.Router();
const config = require("../../config")[process.env.NODE_ENV || "development"];
const {
  userLoginController,
  secretRouteController,
  companyRegisterController,
  companyLoginController,
} = require("../controllers/authController");
const isEmployeeLoggedIn = require("../middleware/isEmployeeLoggedIn");
const isCompanyLoggedIn = require("../middleware/isCompanyLoggedIn");
const log = config.log();

router.post("/user/login", userLoginController);

router.post("/company/register", companyRegisterController);

router.post("/company/login", companyLoginController);

//internal api call
router.get("/user/isLoggedIn", isEmployeeLoggedIn, (req, res) => {
  res.json({ ...req.userData, Authenticated: true });
});

router.get("/company/isLoggedIn", isCompanyLoggedIn, (req, res) => {
  res.json({ ...req.userData, Authenticated: true });
});

module.exports = router;
