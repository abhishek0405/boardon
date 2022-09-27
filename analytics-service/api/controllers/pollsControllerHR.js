//const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const Company = require("../models/company");
const Docs = require("../models/docs");
const Employee = require("../models/employee");
const Comments = require("../../../documents-service/api/models/comments");
const Polls = require("../models/polls");
var services = {};

const config = require("../config")[process.env.NODE_ENV || "development"];

const log = config.log();

//HR DASHBOARD VIEW
//FOR NOW, DISPLAYS CURRENT CHECKLIST AND TEXT BOX TO CREATE CHECKLIST

hrDashboard = async (req, res) => {
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

  res.render("hrDashboard", { arr: arr, arr1: currPolls });
};

getPolls = (req, res) => {
  log.info("helooolo");
  res.render("getPolls");
  //res.send('ho')
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
  res.redirect("/hr/hrDashboard");
};

getIndividualPoll = async (req, res) => {
  let currPoll = await Polls.findOne({
    cid: req.params.cid,
    pollId: req.params.pollId,
  });
  let arr;
  if (currPoll.questions.length != 0 && currPoll.questions[0].qs !== "") {
    arr = currPoll.questions;
  } else {
    arr = [];
  }

  res.render("individualPoll", {
    currPoll: req.params.pollId,
    currCompany: req.params.cid,
    arr: arr,
  });
};

addQuestion = async (req, res) => {
  let currentPoll = await Polls.findOne({
    cid: req.body.cid,
    pollId: req.body.pollId,
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
  res.redirect("/hr/" + req.body.cid + "/" + req.body.pollId);
};

postPoll = async (req, res) => {
  let currentPoll = await Polls.findOne({
    cid: req.body.cid,
    pollId: req.body.pollId,
  });
  currentPoll.posted = "yes";

  await currentPoll.save();
  res.redirect("/hr/hrDashboard");
};

viewAllresults = async (req, res) => {
  const cid = req.userData.cid;
  let allPolls = await Polls.find({ cid: cid });

  let chartValues = {};
  let firstChart = allPolls[0];
  xvals = [];
  yvals = [];
  for (var i = 0; i < firstChart.questions[0].opt.length; i++) {
    chartValues[firstChart.questions[0].opt[i]] = 0;
    //xvals.push(firstChart.questions[0].opt[i])
  }

  for (var i = 0; i < firstChart.responses.length; i++) {
    chartValues[firstChart.responses[i].answers[0]] += 1;
  }
  log.info(chartValues);
  for (const key of Object.keys(chartValues)) {
    //console.log(key);
    xvals.push(key);
    yvals.push(chartValues[key]);
  }
  res.render("allPolls", { allPolls: allPolls, xvals: xvals, yvals: yvals });
};

module.exports = {
  hrDashboard,
  getPolls,
  createPoll,
  getIndividualPoll,
  addQuestion,
  postPoll,
  viewAllresults,
};
