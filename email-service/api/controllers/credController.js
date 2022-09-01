const nodemailer = require("nodemailer");
const generator = require("generate-password");
const excelToJson = require("convert-excel-to-json");
const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const emailValidator = require("deep-email-validator");
const Employee = require("../models/employee");
const {
  LogContext,
} = require("twilio/lib/rest/serverless/v1/service/environment/log");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function isEmailValid(email) {
  return emailValidator.validate(email);
}

generateCredentials = async (req, res) => {
  const receiver = req.body.email;
  const company = req.body.company;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const newEmail = firstName + "." + lastName + "@" + company + ".com";

  if (
    receiver == null ||
    company == null ||
    firstName == null ||
    lastName == null
  ) {
    res.status(400).json({
      message: "Invalid request, one or more entries is null",
    });
  }
  const password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
  });
  //Do validations to ensure no field NULL

  const body = `Congratulations ${firstName} ${lastName} on getting an offer at ${company}.
                  Here are your credentials to log in to boardon :
                  Email : ${newEmail}
                  Password: ${password}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: receiver,
    subject: "Boardon Credentials",
    text: body,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    } else {
      res.status(201).json({
        message: info,
      });
    }
  });
};

sendCredentailsToUser = async (employee) => {
  const receiver = employee.email;
  const company = employee.company;
  const firstName = employee.firstname;
  const lastName = employee.lastname;
  const phone = employee.Phone;
  const newEmail = firstName + "." + lastName + "@" + company + ".com";

  if (
    receiver == null ||
    company == null ||
    firstName == null ||
    lastName == null
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

  const mailOptions = {
    from: process.env.EMAIL,
    to: receiver,
    subject: "Boardon Credentials",
    text: body,
  };

  //try to save, if works , send mail
  const employeeObj = {
    //change the Ids,maybe random generate
    cid: 1,
    eid: 1,
    name: firstName + " " + lastName,
    dob: "02/11/2001",
    username: newEmail,
    //hash later
    password: password,
  };

  const employeeEntity = new Employee(employeeObj);
  const { valid, reason, validators } = await isEmailValid(receiver);
  //ISP blocks connections to port 25
  if (valid || validators[reason].reason == "Timeout") {
    employeeEntity
      .save()
      .then((newEmployee) => {
        log.info(`Employee ${newEmployee._id} Account Created`);
        transporter.sendMail(mailOptions).then((obj) => {
          log.info(`Mail sent to ${receiver}`);
        });

        return { message: "Sent successfully" };
      })
      .catch((err) => {
        log.error(err);
      });
  } else {
    log.info("Invalid Email");
    log.info(validators[reason]);
    log.info(validators[reason].reason);
  }

  //send message

  const sender = process.env.TWILIO_SENDER_NUMBER;
  const receiverNo = "+" + phone;
  client.messages
    .create({
      body: body,
      from: sender,
      to: receiverNo,
    })
    .then((message) => {
      log.info(`Message sent to ${receiverNo}`);
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
      ({
        A: firstname,
        B: lastname,
        C: email,
        D: company,
        E: Phone,
        ...rest
      }) => ({
        firstname,
        lastname,
        email,
        company,
        Phone,
        ...rest,
      })
    );
    responseList = [];
    for (employee of updatedEmployeeList) {
      var response = sendCredentailsToUser(employee);
      responseList.push(response);
    }

    return res.json(responseList);
  }
};

module.exports = {
  generateCredentials,
  generateCredentialsFromExcel,
};
