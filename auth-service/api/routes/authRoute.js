const express = require("express");
const router = express.Router();
const config = require("../../config")[process.env.NODE_ENV || "development"];
const {
  userLoginController,
  secretRouteController,
} = require("../controllers/authController");
const isLoggedIn = require("../middleware/isLoggedIn");
const log = config.log();

router.post("/user/login", userLoginController);

//internal api call
router.get("/user/isLoggedIn", isLoggedIn, (req, res) => {
  res.json({ Authenticated: true });
});

router.get("/user/secretRoute", isLoggedIn, secretRouteController);

module.exports = router;
