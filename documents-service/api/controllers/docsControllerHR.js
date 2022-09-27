//const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const Company = require("../models/company");
const Docs = require("../models/docs");
const Employee = require("../models/employee");
const Comments = require("../models/comments");
const Polls = require("../models/polls");
var services = {};

const config = require("../config")[process.env.NODE_ENV || "development"];

const log = config.log();

//HR DASHBOARD VIEW
//FOR NOW, DISPLAYS CURRENT CHECKLIST AND TEXT BOX TO CREATE CHECKLIST

hrDashboard = async (req, res) => {
  //log.info("hello")
  const cid = req.userData.cid;
  console.log(cid);
  let curr = await Company.findOne({ cid: cid });
  let arr;

  if (curr.docs_needed.length != 1 && curr.docs_needed[0] !== "") {
    arr = curr.docs_needed;
  } else {
    arr = [];
  }

  let currPolls = await Polls.find({ cid: cid });

  res.render("hrDashboard", { arr: arr, arr1: currPolls });
};

createChecklist = async (req, res) => {
  let requirements = req.body;
  //log.info("hello")
  log.info(requirements);
  const cid = req.userData.cid;
  //retrieving only company 1. Change this later after auth
  var comp = await Company.findOne({ cid: cid });
  //var comp = await Company.find({});
  //log.info(comp)
  var docs_needed = requirements.docs.split(",");
  comp.docs_needed = docs_needed;

  await comp.save();
  res.redirect("/hr/hrDashboard");
};

viewChecklist = async (req, res) => {
  const cid = req.userData.cid;
  var comp = await Company.findOne({ cid: cid });
  let arr;

  if (comp.docs_needed.length != 1 && comp.docs_needed[0] !== "") {
    arr = comp.docs_needed;
  } else {
    arr = [];
  }
  res.render("hrDashboard", { arr: arr });
};

//UPDATE CHECKLIST LATER WHEN WE ADD INTERACTIVITY TO THE LIST

updateChecklist = async (req, res) => {
  const cid = req.userData.cid;
  let requirements = req.body;
  //log.info("hello")
  log.info(requirements);

  //retrieving only company 1. Change this later after auth
  var comp = await Company.findOne({ cid: cid });
  //var comp = await Company.find({});
  //log.info(comp)
  var docs_needed = requirements.docs.split(",");
  comp.docs_needed = docs_needed;

  await comp.save();
  res.redirect("/hr/hrDashboard");
};

getDocs = async (req, res) => {
  const cid = req.userData.cid;
  var allEmployees = await Employee.find({ cid: cid });

  res.render("allEmployees", { allEmp: allEmployees });
};

getIndividualDocs = async (req, res) => {
  //req.params.username
  const username = req.params.username;
  let currEmp = await Employee.findOne({
    username: username,
  });
  console.log(currEmp);
  let curr = await Company.findOne({ cid: currEmp.cid });

  let arr;

  if (curr.docs_needed.length != 1 && curr.docs_needed[0] !== "") {
    arr = curr.docs_needed;
  } else {
    arr = [];
  }
  let currUploaded = await Docs.findOne({ username: currEmp.username });
  let currComments = await Comments.findOne({ username: currEmp.username });
  var docsCurr = {};
  var commCurr = {};
  if (currUploaded !== null) {
    docsCurr = currUploaded.documents;
  }
  if (currComments !== null) {
    commCurr = currComments.comments;
  }

  res.render("individualEmployee", {
    eid: currEmp.eid,
    name: currEmp.name,
    username: currEmp.username,
    arr: arr,
    docsCurr: docsCurr,
    commCurr: commCurr,
  });
};

postComment = async (req, res) => {
  var docName = Object.keys(req.body)[0];
  if (docName === "comment") {
    docName = Object.keys(req.body)[1];
  }
  log.info(docName);
  const username = req.body.username;
  let n = await Comments.findOne({ username: username });
  if (n === null) {
    n = {
      username: username,
    };
  }
  if (!("comments" in n) || Object.keys(n.comments).length === 0)
    n.comments = {};
  n.comments[docName] = req.body.comment;
  let newComment = new Comments(n);
  await newComment.save();
  /*let currEmp = await Employee.findOne({username : 'vishaka.mohan@fidelity.com'})
  let curr = await Company.findOne({cid : currEmp.cid})
  
  let arr

  if(curr.docs_needed.length != 1 && curr.docs_needed[0] !== ""){
    arr = curr.docs_needed
  }
  else{
    arr = []
  }
  let currUploaded = await Docs.findOne({username : currEmp.username})
  let currComments = await Comments.findOne({username : currEmp.username})
  var docsCurr = currUploaded.documents
  var commCurr = currComments.comments
  res.render('individualEmployee', {eid : currEmp.eid, name : currEmp.name, username : currEmp.username, arr : arr , docsCurr : docsCurr, commCurr : commCurr})
*/

  res.redirect(`/hr/${username}`);
};

module.exports = {
  hrDashboard,
  createChecklist,
  viewChecklist,
  updateChecklist,
  getDocs,
  getIndividualDocs,
  postComment,
};
