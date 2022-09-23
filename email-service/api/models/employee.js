const mongoose = require("mongoose");

//employee schema
const EmployeeSchema = mongoose.Schema({
  cid: {
    type: Number,
  },
  eid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  dob: {
    type: String,
  },
  phone: {
    type: String,
  },
  //the email user provides
  email: {
    type: String,
  },
  //the email system generates
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
