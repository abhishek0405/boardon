const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const mongoose = require("mongoose");
const Employee = require("../models/employee");
const Company = require("../models/company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const domain = process.env.FRONTEND_DOMAIN || "localhost";
const userLoginController = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  log.info(domain);
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

          res.cookie("authToken", token, {
            domain: domain,
            path: "/",
          });

          // res.setHeader("Set-Cookie", [`authToken=${token};`]);

          res.json({
            status: "authenticated",
            token: token,
          });
        } else {
          res.clearCookie("authToken");
          return res.json({ status: "error", error: "Invalid Password" });
        }
      } else {
        res.clearCookie("authToken");
        return res.json({ status: "error", error: "Invalid username" });
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
            status: "successful",
            message: `Registered Succesfully`,
          });
        });
      } else {
        res.json({
          status: "error",
          error: "Company already exists!",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
  //res.json(req.body);
};

const companyLoginController = (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  Company.find({ name: username })
    .then(async (foundCompany) => {
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

          res.cookie("authToken", token, { domain: domain, path: "/" });
          res.json({
            status: "authenticated",
            token: token,
          });
        } else {
          res.clearCookie("authToken");
          return res.json({ status: "error", error: "Invalid Password" });
        }
      } else {
        res.clearCookie("authToken");
        return res.json({ status: "error", error: "Invalid username" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const logout = (req, res) => {
  // if (req.session) {
  //   req.session.destroy(err => {
  //     if (err) {
  //       res.json({status : "error",mag : 'Unable to log out'})
  //     } else {
  //       res.json({status : "success",msg : 'Logout successful'})
  //     }
  //   });
  // } else {
  //   res.end()
  // }
  console.log(req.cookies);
  if (req.cookies.authToken) {
    res.clearCookie("authToken");
    res.json({ status: "success", msg: "Logout successful" });
  } else {
    res.json({ status: "error", mag: "Unable to log out" });
  }
};

module.exports = {
  userLoginController,
  secretRouteController,
  companyRegisterController,
  companyLoginController,
  logout,
};
