//const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const Company = require('../models/company');
const Docs = require('../models/docs');
const Employee = require('../models/employee')
const Comments = require('../models/comments')
const Polls = require('../models/polls')
var services = {}


const config = require("../config")[process.env.NODE_ENV || "development"];

const log = config.log();



//HR DASHBOARD VIEW
//FOR NOW, DISPLAYS CURRENT CHECKLIST AND TEXT BOX TO CREATE CHECKLIST

hrDashboard = async (req, res) => {
  //log.info("hello")
  let curr = await Company.findOne({cid : 1})
  let arr

  if(curr.docs_needed.length != 1 && curr.docs_needed[0] !== ""){
    arr = curr.docs_needed
  }
  else{
    arr = []
  }

  let currPolls = await Polls.find({cid : 1})

  res.render('hrDashboard', {arr : arr, arr1: currPolls})
}

createChecklist = async (req, res) => {
  let requirements = req.body;
  //log.info("hello")
  log.info(requirements)

  //retrieving only company 1. Change this later after auth
  var comp = await Company.findOne({cid : 1})
  //var comp = await Company.find({});
  //log.info(comp)
  var docs_needed = requirements.docs.split(',');
  comp.docs_needed = docs_needed;

  await comp.save();
  res.redirect("/hr/hrDashboard");

};

viewChecklist = async (req, res) => {

  var comp = await Company.findOne({cid : 1})
  let arr

  if(comp.docs_needed.length != 1 && comp.docs_needed[0] !== ""){
    arr = comp.docs_needed
  }
  else{
    arr = []
  }
  res.render('hrDashboard', {arr : arr})

  
};



//UPDATE CHECKLIST LATER WHEN WE ADD INTERACTIVITY TO THE LIST

updateChecklist = async (req, res) => {

  let requirements = req.body;
  //log.info("hello")
  log.info(requirements)

  //retrieving only company 1. Change this later after auth
  var comp = await Company.findOne({cid : 1})
  //var comp = await Company.find({});
  //log.info(comp)
  var docs_needed = requirements.docs.split(',');
  comp.docs_needed = docs_needed;

  await comp.save();
  res.redirect("/hr/hrDashboard");
  
};

getDocs = async (req, res) => {

  var allEmployees = await Employee.find({});

  
  res.render("allEmployees", {allEmp : allEmployees})

};

getIndividualDocs = async (req, res) => {

  //req.params.username
  let currEmp = await Employee.findOne({username : 'vishaka.mohan@fidelity.com'})
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

  
};


postComment = async (req, res) => {

  var docName = Object.keys(req.body)[0]
  if(docName === 'comment'){
    docName = Object.keys(req.body)[1]
  }
    log.info(docName)
    let n = await Comments.findOne({username : "vishaka.mohan@fidelity.com" })
    if(!("comments" in n) || Object.keys(n.comments).length === 0)
      n.comments = {}
    n.comments[docName] = req.body.comment
    let newComment = new Comments(n)
    await newComment.save()
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
    res.redirect('/hr/vishaka.mohan@fidelity.com')
  
}



module.exports = {
  hrDashboard,
  createChecklist,
  viewChecklist,
  updateChecklist,
  getDocs,
  getIndividualDocs,
  postComment,

};


