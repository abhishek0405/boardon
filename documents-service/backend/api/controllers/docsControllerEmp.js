//const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const Docs = require('../models/docs');
const multer = require('multer');
const Company = require('../models/company');
const Employee = require('../models/employee')
const Comments = require('../models/comments')
const Polls = require('../models/polls')
//const fileUpload = multer();

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
//const { update } = require('../../../email-service/api/models/employee');
const config = require("../config")[process.env.NODE_ENV || "development"];
const upload = require("../config/multer");
//const { getIndividualPoll } = require("./docsControllerHR");
const log = config.log();
const cloud_name = process.env.CLOUD_NAME;
const cloud_api_key = process.env.CLOUD_API_KEY;
const cloud_api_secret = process.env.CLOUD_API_SECRET;
cloudinary.config({
  cloud_name: cloud_name,
  api_key: cloud_api_key,
  api_secret: cloud_api_secret,
});


empDashboard = async (req, res) => {
  let currEmp = await Employee.findOne({username : req.userData.username})
  let curr = await Company.findOne({cid : currEmp.cid})
  let arr

  if(curr.docs_needed.length != 1 && curr.docs_needed[0] !== ""){
    arr = curr.docs_needed
  }
  else{
    arr = []
  }
  let currUploaded = await Docs.findOne({username : currEmp.username})
  var docsCurr = {};
  if (currUploaded !== null) {
    docsCurr = currUploaded.documents;
  }
  let currComments = await Comments.findOne({username : currEmp.username})
  var commCurr = {};
  if (currComments !== null) {
    commCurr = currComments.comments;
  }
  res.json({
    
    arr : arr , 
    docsCurr : docsCurr, 
    commCurr : commCurr
  })
}



viewChecklist = async (req, res) => {
  //retrieving only company 1. Change this later after auth
  var comp = await Company.findOne({cid : req.userData.cid})
  console.log("test")
  res.send(comp.docs_needed)

};

uploadDocs = async (req, res) => {
  try{
    console.log(req.body)
    console.log(req.file)
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log(result)
    var docName = req.body.doc
    log.info(docName)
    let n = await Docs.findOne({username : req.userData.username })
    if (n === null) {
      n = { username: req.userData.username };
    }
    if(!("documents" in n) || Object.keys(n.documents).length === 0)
      n.documents = {}
    n.documents[docName] = result.url
    let newDoc = new Docs(n)
    await newDoc.save()
    let currEmp = await Employee.findOne({username : req.userData.username})
    let curr = await Company.findOne({cid : currEmp.cid})
    let arr

    if(curr.docs_needed.length != 1 && curr.docs_needed[0] !== ""){
      arr = curr.docs_needed
    }
    else{
      arr = []
    }
    let currUploaded = await Docs.findOne({username : currEmp.username})
    var docsCurr = {};
    if (currUploaded !== null) {
      docsCurr = currUploaded.documents;
    }
    let currComments = await Comments.findOne({username : currEmp.username})
    var commCurr = {};
    if (currComments !== null) {
      commCurr = currComments.comments;
    }
    res.json({
      
      arr : arr , 
      docsCurr : docsCurr, 
      commCurr : commCurr
    })
    //res.redirect('/emp/empDashboard')
  }
  catch(err){
    log.info(err)
  }

};




module.exports =  {
  empDashboard,
  viewChecklist,
  uploadDocs
  
};


