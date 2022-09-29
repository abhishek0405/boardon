const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const mongoose = require("mongoose");
const Employee = require("../models/employee");
const Company = require("../models/company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLoginController = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Employee.find({ username: username })
    .then(async (foundEmployee) => {
      log.info(foundEmployee);
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
              isCompany: false,
              isEmployee: true,
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

const companyRegisterController = async (req, res) => {
  Company.find({ name: req.body.name })
    .then(async (foundCompanies) => {
      if (foundCompanies.length == 0) {
        const cid = new mongoose.Types.ObjectId();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const companyObj = {
          //change the Ids,maybe random generate
          cid: cid,
          name: req.body.name,
          address: req.body.address,
          description: req.body.description,
          password: hashedPassword,
          docs_needed: [],
          domain: req.body.domain,
        };
        const companyEntity = new Company(companyObj);
        companyEntity.save().then((newCompany) => {
          log.info(`Onboarded ${newCompany.cid} : ${newCompany.name}`);
          res.json({
            message: `Registered Succesfully`,
          });
        });
      } else {
        res.json({
          error: `${req.body.name} is already registered`,
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
  //res.json(req.body);
};

const companyLoginController = (req, res) => {
  log.info("hello")
  const username = req.body.name;
  log.info(username)
  const password = req.body.password;
  Company.find({ name: username })
    .then(async (foundCompany) => {
      log.info("helll")
      log.info(foundCompany)
      if (foundCompany.length == 1) {
        const dbPassword = foundCompany[0].password;
        const passwordMatchFlag = await bcrypt.compare(password, dbPassword);
        if (passwordMatchFlag === true) {
          const token = jwt.sign(
            {
              cid: foundCompany[0].cid,
              name: foundCompany[0].name,
              domain: foundCompany[0].domain,
              isCompany: true,
              isEmployee: false,
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

module.exports = {
  userLoginController,
  secretRouteController,
  companyRegisterController,
  companyLoginController,
};
