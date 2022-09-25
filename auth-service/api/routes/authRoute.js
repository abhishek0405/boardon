const express = require("express");
const router = express.Router();
const config = require("../../config")[process.env.NODE_ENV || "development"];
const {
  userLoginController,
  secretRouteController,
  companyRegisterController,
  companyLoginController,
} = require("../controllers/authController");
const isLoggedIn = require("../middleware/isLoggedIn");
const isCompanyLoggedIn = require("../middleware/isCompanyLoggedIn");
const log = config.log();

router.post("/user/login", userLoginController);

router.get("/user/secretRoute", isLoggedIn, secretRouteController);

router.post("/company/register", companyRegisterController);

router.post("/company/login", companyLoginController);

//internal api call
router.get("/user/isLoggedIn", isLoggedIn, (req, res) => {
  res.json({ ...req.userData, Authenticated: true });
});

router.get("/company/isLoggedIn", isCompanyLoggedIn, (req, res) => {
  res.json(req.userData);
});

module.exports = router;
