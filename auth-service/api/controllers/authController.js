const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const mongoose = require("mongoose");
const Employee = require("../models/employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userLoginController = (req, res) => {
  log.info(req.body);
  const username = req.body.username;
  const password = req.body.password;
  Employee.find({ username: username })
    .then(async (foundEmployee) => {
      if (foundEmployee.length == 1) {
        const dbPassword = foundEmployee[0].password;
        const passwordMatchFlag = await bcrypt.compare(password, dbPassword);
        if (passwordMatchFlag === true) {
          const token = jwt.sign(
            {
              eid: foundEmployee[0].eid,
              cid: foundEmployee[0].cid,
              username: foundEmployee[0].username,
              name: foundEmployee[0].name,
              email: foundEmployee[0].email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );

          res.cookie("authToken", token);
          res.json({
            status: "authenticated",
            token: token,
          });
        } else {
          res.clearCookie("authToken");
          return res.json("Invalid Credentials");
        }
      } else {
        res.clearCookie("authToken");
        return res.json({ error: "Invalid Request" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const secretRouteController = (req, res) => {
  res.json(req.userData);
};

module.exports = {
  userLoginController,
  secretRouteController,
};
