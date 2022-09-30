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
  const cid = req.userData.cid;
  console.log(cid);
  let curr = await Company.findOne({cid : cid})
  let arr

  if(curr.docs_needed.length != 1 && curr.docs_needed[0] !== ""){
    arr = curr.docs_needed
  }
  else{
    arr = []
  }

  
  res.json({arr : arr})

  //res.render('hrDashboard', {arr : arr, arr1: currPolls})
}

createChecklist = async (req, res) => {
  console.log(req.body)
  log.info(req.body)
  let requirements = req.body;
  log.info("hellooooo")
  log.info(requirements)
  
  var docs_needed = []
  if(requirements.Aadhaar){
    docs_needed.push('Aadhaar')
  }
  if(requirements.BirthCertificate){
    docs_needed.push('BirthCertificate')
  }
  if(requirements.PanCard){
    docs_needed.push('PanCard')
  }
  if(requirements.Passport){
    docs_needed.push('Passport')
  }

  if(requirements.Marksheet){
    docs_needed.push('Marksheet')
  }
  if(requirements.Resume){
    docs_needed.push('Resume')
  }
  if(requirements.ElectricityBill){
    docs_needed.push('ElectricityBill')
  }
  if(requirements.VoterId){
    docs_needed.push('VoterId')
  }
  const cid = req.userData.cid;
  //retrieving only company 1. Change this later after auth
  var comp = await Company.findOne({cid : cid})
  
  
  comp.docs_needed = docs_needed;

  await comp.save();
  
  
  let arr

  if(comp.docs_needed.length != 1 && comp.docs_needed[0] !== ""){
    arr = comp.docs_needed
  }
  else{
    arr = []
  }

  
  res.json({arr : arr})
  

};


//UPDATE CHECKLIST LATER WHEN WE ADD INTERACTIVITY TO THE LIST



getDocs = async (req, res) => {

  const cid = req.userData.cid;
  var allEmployees = await Employee.find({cid : cid})
  

  res.json({allEmp : allEmployees})
  
  //res.render("allEmployees", {allEmp : allEmployees})

};

getIndividualDocs = async (req, res) => {

  //req.params.username
  log.info("oiii")
  const username = req.params.username;
  let currEmp = await Employee.findOne({username : username})
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
  var docsCurr = {};
  var commCurr = {};
  if (currUploaded !== null) {
    docsCurr = currUploaded.documents;
  }
  if (currComments !== null) {
    commCurr = currComments.comments;
  }
  
  res.json({eid : currEmp.eid, name : currEmp.name, username : currEmp.username, arr : arr , docsCurr : docsCurr, commCurr : commCurr})
  //res.render('individualEmployee', {eid : currEmp.eid, name : currEmp.name, username : currEmp.username, arr : arr , docsCurr : docsCurr, commCurr : commCurr})

  
};


postComment = async (req, res) => {


  log.info("post comment")
  log.info(req.body)

  
  var comment = ''
  var docName = ''
  if(req.body.commentAadhaar){
        docName = 'Aadhaar'
        comment = req.body.commentAadhaar
    }
    else if(req.body.commentBirthCertificate){
       docName = 'BirthCertificate'
       comment = req.body.commentBirthCertificate
    }
    else if(req.body.commentPanCard){
        docName = 'PanCard'
        comment = req.body.commentPanCard
    }
    else if(req.body.commentPassport){
        docName = 'Passport'
        comment = req.body.commentPassport
    }

    else if(req.body.commentMarksheet){
       docName = 'Marksheet'
       comment = req.body.commentMarksheet
    }
    else if(req.body.commentResume){
       docName = 'Resume'
       comment = req.body.commentResume
    }
    else if(req.body.commentElectricityBill ){
        docName = 'ElectricityBill'
        comment = req.body.commentElectricityBill
    }
    else if(req.body.commentVoterId ){
       docName = 'VoterId'
       comment = req.body.commentVoterId
    }
    log.info(docName)
    log.info(comment)
    const username = req.body.username;
    console.log(req.body.username)
    let n = await Comments.findOne({username : username })
    if (n === null) {
      n = {username : username}
    }
    if(!("comments" in n) || Object.keys(n.comments).length === 0)
      n.comments = {}
    n.comments[docName] = comment
    let newComment = new Comments(n)
    await newComment.save()
    
    let currEmp = await Employee.findOne({username : username})
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
    var docsCurr = {};
    var commCurr = {};
    if (currUploaded !== null) {
      docsCurr = currUploaded.documents;
    }
    if (currComments !== null) {
      commCurr = currComments.comments;
    }
    
    res.json({eid : currEmp.eid, name : currEmp.name, username : currEmp.username, arr : arr , docsCurr : docsCurr, commCurr : commCurr})

    //res.redirect('/hr/vishaka.mohan@fidelity.com')
  
}



module.exports = {
  hrDashboard,
  createChecklist,
  getDocs,
  getIndividualDocs,
  postComment,

};


