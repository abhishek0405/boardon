const nodemailer = require("nodemailer");
const generator = require("generate-password");
const excelToJson = require("convert-excel-to-json");
const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const bcrypt = require("bcrypt");
const emailValidator = require("deep-email-validator");
const Employee = require("../models/employee");
const QRCode = require("qrcode");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const mongoose = require("mongoose");
const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function isEmailValid(email) {
  return emailValidator.validate(email);
}

sendCredentailsToUser = async (employee, req) => {
  const receiver = employee.email;
  const company = req.userData.name;
  const firstName = employee.firstname;
  const lastName = employee.lastname;
  const phone = employee.phone;
  const domain = req.userData.domain;
  const dob = employee.dob;
  const cid = req.userData.cid;
  const newEmail = firstName + "." + lastName + "@" + domain;

  if (
    receiver == null ||
    company == null ||
    firstName == null ||
    lastName == null ||
    phone == null
  ) {
    return {
      message: "Invalid request, one or more entries is null",
    };
  }
  const password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
  });

  const body = `Congratulations ${firstName} ${lastName} on getting an offer at ${company}.
                Here are your credentials to log in to boardon :
                  Email : ${newEmail}
                  Password: ${password}`;

  const credentialsBody = `Email : ${newEmail},
                           Password :${password} `;
  // return res.json("hit");
  Employee.find({ email: receiver })
    .exec()
    .then(async (foundUsers) => {
      if (foundUsers.length == 0) {
        Employee.find({ phone: phone })
          .exec()
          .then(async (foundUsers2) => {
            if (foundUsers2.length == 0) {
              const eid = new mongoose.Types.ObjectId();
              const hashedPassword = await bcrypt.hash(password, 10);
              const employeeObj = {
                //change the Ids,maybe random generate
                cid: cid,
                eid: eid,
                name: firstName + " " + lastName,
                dob: dob,
                phone: phone,
                email: receiver,
                username: newEmail,
                //hash later
                password: hashedPassword,
              };
              const employeeEntity = new Employee(employeeObj);
              const { valid, reason, validators } = await isEmailValid(
                receiver
              );
              //ISP blocks connections to port 25
              if (valid || validators[reason].reason == "Timeout") {
                employeeEntity
                  .save()
                  .then((newEmployee) => {
                    log.info(`Employee ${newEmployee.eid} Account Created`);
                    QRCode.toDataURL(credentialsBody).then((imgUrl) => {
                      const mailOptions = {
                        from: process.env.EMAIL,
                        to: receiver,
                        subject: "Boardon Credentials",
                        attachDataUrls: true,
                        html: `<p>Congratulations <b>${firstName} ${lastName}</b> on getting an offer at
                    <b>${company}</b>. Below are the credentials to login to the BoardOn Portal, scan the QR Code
                    to read the same.</p>

                    <p><img src=${imgUrl}></p>
                    <p></p>
                    <h3>
                    Regards
                    <p></p>
                    BoardOn Team
                    </h3>`,
                      };

                      transporter.sendMail(mailOptions).then((obj) => {
                        log.info(`Mail sent to ${receiver}`);
                      });

                      return { message: "Sent successfully" };
                    });
                  })
                  .catch((err) => {
                    log.error(err);
                  });
              } else {
                log.info(`Invalid email ${receiver}`);
                log.info(validators[reason]);
                log.info(validators[reason].reason);
              }

              // send message

              // const sender = process.env.TWILIO_SENDER_NUMBER;
              // const receiverNo = "+" + phone;
              // client.messages
              //   .create({
              //     body: body,
              //     from: sender,
              //     to: receiverNo,
              //   })
              //   .then((message) => {
              //     log.info(`Message sent to ${receiverNo}`);
              //   })
              //   .catch((err) => {
              //     log.info(err);
              //   });
            } else {
              log.info(`User with phone number ${phone} already registered`);
              return;
            }
          });
      } else {
        log.info(`User with email ${receiver} already registered`);
        return;
      }
    })
    .catch((err) => {
      log.info(err);
    });
};

generateCredentialsFromExcel = (req, res) => {
  const filePath = req.file.path;
  const result = excelToJson({
    sourceFile: filePath,
    header: {
      rows: 1,
    },
  });

  for (const sheetName in result) {
    const employeeList = result[sheetName];

    const updatedEmployeeList = employeeList.map(
      ({ A: firstname, B: lastname, C: dob, D: email, E: phone, ...rest }) => ({
        firstname,
        lastname,
        dob,
        email,
        phone,
        ...rest,
      })
    );
    responseList = [];
    for (employee of updatedEmployeeList) {
      var response = sendCredentailsToUser(employee, req);
      responseList.push(response);
    }

    return res.json(responseList);
  }
};

module.exports = {
  generateCredentialsFromExcel,
};
