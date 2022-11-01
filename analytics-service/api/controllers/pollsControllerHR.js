//const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const Company = require("../models/company");
const Docs = require("../models/docs");
const Employee = require("../models/employee");
const Comments = require("../models/comments");
const Polls = require("../models/polls");
const { ObjectId } = require("mongodb");

var services = {};

const config = require("../config")[process.env.NODE_ENV || "development"];

const log = config.log();

//HR DASHBOARD VIEW
//FOR NOW, DISPLAYS CURRENT CHECKLIST AND TEXT BOX TO CREATE CHECKLIST

allHrPolls = async (req, res) => {
  //log.info("hello")
  const cid = req.userData.cid;
  let curr;
  curr = await Company.findOne({ cid: cid });

  let arr;

  if (
    curr !== null &&
    curr.docs_needed.length !== 1 &&
    curr.docs_needed[0] !== ""
  ) {
    arr = curr.docs_needed;
  } else {
    arr = [];
  }

  let currPolls = {};
  currPolls = await Polls.find({ cid: cid });

  res.json({
    cid: req.userData.cid,
    arr: currPolls,
  });
  //res.render("hrDashboard", { arr: arr, arr1: currPolls });
};

createPoll = async (req, res) => {
  log.info("creating poll");
  let n = {};
  const cid = req.userData.cid;
  //change to any cid
  let currPollCount = await Polls.find({ cid: cid });
  if (currPollCount === null) {
    currPollCount = [];
  }
  n.cid = cid;
  n.pollId = currPollCount.length + 1;
  n.pollName = req.body.pollName;
  n.questions = [];
  n.responses = [];
  n.posted = "no";

  let newPoll = new Polls(n);
  await newPoll.save();

  let curr;
  curr = await Company.findOne({ cid: cid });

  let arr;

  if (
    curr !== null &&
    curr.docs_needed.length !== 1 &&
    curr.docs_needed[0] !== ""
  ) {
    arr = curr.docs_needed;
  } else {
    arr = [];
  }

  let currPolls = {};
  currPolls = await Polls.find({ cid: cid });

  res.json({
    cid: req.userData.cid,
    arr: currPolls,
  });
};

getIndividualPoll = async (req, res) => {
  console.log("hey");
  console.log(req.params.cid);
  let currPoll = await Polls.findOne({
    cid: ObjectId(req.params.cid),
    pollId: req.params.pollId,
  });
  console.log(currPoll);
  let arr;
  if (currPoll.questions.length != 0 && currPoll.questions[0].qs !== "") {
    arr = currPoll.questions;
  } else {
    arr = [];
  }

  res.json({
    currPoll: req.params.pollId,
    currCompany: req.params.cid,
    arr: arr,
    status: currPoll.posted,
    msg: "success",
  });
};

addQuestion = async (req, res) => {
  console.log(req.body);
  let currentPoll = await Polls.findOne({
    cid: req.userData.cid,
    pollId: parseInt(req.body.pollId),
  });
  opt = [];
  if (req.body.option1 !== "NA") {
    opt.push(req.body.option1);
  }
  if (req.body.option2 !== "NA") {
    opt.push(req.body.option2);
  }
  if (req.body.option3 !== "NA") {
    opt.push(req.body.option3);
  }
  if (req.body.option4 !== "NA") {
    opt.push(req.body.option4);
  }
  currentPoll.questions.push({
    qs: req.body.question,
    opt: opt,
  });
  await currentPoll.save();

  let arr;
  if (currentPoll.questions.length != 0 && currentPoll.questions[0].qs !== "") {
    arr = currentPoll.questions;
  } else {
    arr = [];
  }

  res.json({
    currPoll: parseInt(req.body.pollId),
    currCompany: req.userData.cid,
    arr: arr,
  });
};

postPoll = async (req, res) => {
  console.log("yesiii");
  let currentPoll = await Polls.findOne({
    cid: req.userData.cid,
    pollId: parseInt(req.body.pollId),
  });
  if (req.body.status === "yes") currentPoll.posted = "yes";
  else currentPoll.posted = "no";

  await currentPoll.save();

  let arr;
  if (currentPoll.questions.length != 0 && currentPoll.questions[0].qs !== "") {
    arr = currentPoll.questions;
  } else {
    arr = [];
  }

  res.json({
    currPoll: req.body.pollId,
    currCompany: req.userData.cid,
    arr: arr,
    status: currentPoll.posted,
    msg: "success",
  });
};
//res.redirect("/hr/hrDashboard");

viewAllresults = async (req, res) => {
  console.log("hellooo");
  console.log(req.query);
  const cid = ObjectId(req.userData.cid);
  var pid = 1;
  if ("poll" in req.query && req.query.poll !== "")
    pid = parseInt(req.query.poll);

  console.log(pid);

  let requiredPoll = await Polls.findOne({ cid: cid, pollId: pid });
  console.log(requiredPoll);

  let allCharts = [];
  let questions = [];

  //for every question in given poll, generate pie chart
  for (var i = 0; i < requiredPoll.questions.length; i++) {
    var copts = [];
    questions.push(requiredPoll.questions[i].qs);

    var opts = requiredPoll.questions[i].opt;
    var resp = requiredPoll.responses;
    var chartValues = {};
    for (var j = 0; j < opts.length; j++) {
      chartValues[opts[j]] = 0;
    }

    for (var j = 0; j < resp.length; j++) {
      chartValues[resp[j].answers[i]] += 1;
    }

    for (const key of Object.keys(chartValues)) {
      var x = { name: key, value: chartValues[key] };
      copts.push(x);
    }
    allCharts.push(copts);
  }

  console.log(allCharts);

  let currPolls = await Polls.find({ cid: cid });

  res.json({
    allCharts: allCharts,
    questions: questions,
    currPolls: currPolls,
  });
};

module.exports = {
  allHrPolls,

  createPoll,
  getIndividualPoll,
  addQuestion,
  postPoll,
  viewAllresults,
};
