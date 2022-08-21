const nodemailer = require("nodemailer");
const generator = require("generate-password");
const readxlsxFile = require("read-excel-file/node");
const excelToJson = require("convert-excel-to-json");
const XLSX = require("xlsx");
const services = {};

module.exports = (log) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  services.generateCredentials = async (req, res) => {
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

  services.mailCredentails = (employee) => {
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

  services.generateCredentialsFromExcel = (req, res) => {
    const result = excelToJson({
      sourceFile: "BoardonSheetTest.xlsx",
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
      log.info(updatedEmployeeList);
      responseList = [];
      for (employee of updatedEmployeeList) {
        var response = services.mailCredentails(employee);
        console.log(response);
        responseList.push(response);
      }

      return res.json(responseList);
    }
  };

  return services;
};

// module.exports = {
//   generateCredentials,
//   generateCredentialsFromExcel,
// };
