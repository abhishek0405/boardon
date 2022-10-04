//const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const Docs = require("../models/docs");
const multer = require("multer");
const Company = require("../models/company");
const Employee = require("../models/employee");
const Comments = require("../models/comments");
const Polls = require("../models/polls");
//const fileUpload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
//const { update } = require('../../../email-service/api/models/employee');
const config = require("../config")[process.env.NODE_ENV || "development"];
const upload = require("../config/multer");
//const { getIndividualPoll } = require("./docsControllerHR");
const log = config.log();

viewPolls = async (req, res) => {
  const username = req.userData.username;
  console.log("heyy")
  console.log(username);
  let currEmp = await Employee.findOne({
    username: username,
  });
  let currPolls = {};
  if (currEmp !== null) {
    currPolls = await Polls.find({ cid: currEmp.cid, posted: "yes" });
  }

  res.json({ arr: currPolls });
};

getIndividualPoll = async (req, res) => {
  let currPoll;
  currPoll = await Polls.findOne({
    cid: req.params.cid,
    pollId: req.params.pollId,
  });
  if (currPoll === null) {
    currPoll = {};
  }

  res.json({ currPoll: currPoll });
};

submitPoll = async (req, res) => {
  console.log(req.body)
  //log.info(req.body)
  let currPoll;
  currPoll = await Polls.findOne({
    cid: req.userData.cid,
    pollId: req.body.pollId,
  });
  if (currPoll === null) {
    currPoll = {};
  }
  let n = {};
  n.username = req.userData.username;
  ans = [];
  f = 0;

  //change this later
  for(var i = 0; i < currPoll.questions.length; i++){
    ans.push(req.body[currPoll.questions[i].qs])
  }
  console.log("here are the answers")
  console.log(ans)
  
  if (currPoll.responses.length === 0) {
    
    

    currPoll.responses.push({
      username: req.userData.username,
      answers: ans,
    });
    await currPoll.save();
  } else {
    for (var i = 0; i < currPoll.responses.length; i++) {
      if (currPoll.responses[i].username === req.userData.username) {
        

        currPoll.responses[i].answers = ans;

        //currPoll.responses.push(n)
        await currPoll.save();
        f = 1;
        break;
      }
    }
  }

  
  currPoll = await Polls.findOne({
    cid: req.userData.cid,
    pollId: req.body.pollId,
  });
  if (currPoll === null) {
    currPoll = {};
  }

  res.json({ currPoll: currPoll });
};

module.exports = {
  viewPolls,
  getIndividualPoll,
  submitPoll,
};
