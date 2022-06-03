const nodemailer = require("nodemailer");
const generator = require("generate-password");
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
const generateCredentials = (req, res) => {
  const receiver = req.body.email;
  const company = req.body.company;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const newEmail = firstName + "." + lastName + "@" + company + ".com";
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

  console.log(body);
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

const generateCredentialsFromExcel = (req, res) => {};

module.exports = {
  generateCredentials,
  generateCredentialsFromExcel,
};
