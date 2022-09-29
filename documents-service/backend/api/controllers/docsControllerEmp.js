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


cloudinary.config({ 
  cloud_name: 'dpsmilpng', 
  api_key: '369879681634961', 
  api_secret: 'MsmXoTOP9OaZaJGbVuLjzhoNEuo' 
});

empDashboard = async (req, res) => {
  let currEmp = await Employee.findOne({username : "vishaka.mohan@fidelity.com"})
  let curr = await Company.findOne({cid : currEmp.cid})
  let arr

  if(curr.docs_needed.length != 1 && curr.docs_needed[0] !== ""){
    arr = curr.docs_needed
  }
  else{
    arr = []
  }
  let currUploaded = await Docs.findOne({username : currEmp.username})
  var docsCurr = currUploaded.documents
  let currComments = await Comments.findOne({username : currEmp.username})
  var commCurr = currComments.comments
  res.render('empDashboard', {arr : arr , docsCurr : docsCurr, commCurr : commCurr})
}



viewChecklist = async (req, res) => {
  //retrieving only company 1. Change this later after auth
  var comp = await Company.findOne({cid : 1})
  console.log("test")
  res.send(comp.documents)

};

uploadDocs = async (req, res) => {
  try{
    const result = await cloudinary.uploader.upload(req.file.path)
    //log.info("request body")
    //log.info(req.body)
    var docName = Object.keys(req.body)[0]
    //log.info(docName)
    let n = await Docs.findOne({username : "vishaka.mohan@fidelity.com" })
    if(!("documents" in n) || Object.keys(n.documents).length === 0)
      n.documents = {}
    n.documents[docName] = result.url
    let newDoc = new Docs(n)
    await newDoc.save()
    res.redirect('/emp/empDashboard')
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


