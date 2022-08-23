const nodemailer = require("nodemailer");
const generator = require("generate-password");
const excelToJson = require("convert-excel-to-json");

const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

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

  log.info(body);
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

mailCredentails = (employee) => {
  const receiver = employee.email;
  const company = employee.company;
  const firstName = employee.firstname;
  const lastName = employee.lastname;
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

  log.info(body);
  const mailOptions = {
    from: process.env.EMAIL,
    to: receiver,
    subject: "Boardon Credentials",
    text: body,
  };

  //Check if good to do like this,
  try {
    transporter.sendMail(mailOptions);
    return { message: "Sent successfully" };
  } catch (error) {
    return { message: error };
  }
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
      ({ A: firstname, B: lastname, C: email, D: company, ...rest }) => ({
        firstname,
        lastname,
        email,
        company,
        ...rest,
      })
    );

    log.info("Employee List ", updatedEmployeeList);
    responseList = [];
    for (employee of updatedEmployeeList) {
      var response = mailCredentails(employee);
      log.info(response);
      responseList.push(response);
    }

    return res.json(responseList);
  }
};

module.exports = {
  generateCredentials,
  generateCredentialsFromExcel,
};
