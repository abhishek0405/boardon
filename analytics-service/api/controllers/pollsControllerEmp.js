//const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const Docs = require('../models/docs');
const multer = require('multer');
const Company = require('../models/company');
const Employee = require('../models/employee')
const Comments = require('../../../documents-service/api/models/comments')
const Polls = require('../../../analytics-service/api/models/polls')
//const fileUpload = multer();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
//const { update } = require('../../../email-service/api/models/employee');
const config = require("../config")[process.env.NODE_ENV || "development"];
const upload = require("../config/multer");
//const { getIndividualPoll } = require("./docsControllerHR");
const log = config.log();


viewPolls = async(req, res) => {
  let currEmp = await Employee.findOne({username : "vishaka.mohan@fidelity.com"})
  let currPolls = await Polls.find({cid : currEmp.cid, posted : "yes"})

  res.render('viewPolls', {arr : currPolls})
}


getIndividualPoll = async(req, res) => {
  let currPoll = await Polls.findOne({cid : req.params.cid, pollId : req.params.pollId})

  res.render('viewIndividualPollEmp' , {currPoll : currPoll})
}

submitPoll = async(req, res) => {
  //log.info(req.body)
  let currPoll = await Polls.findOne({cid : req.body.cid, pollId : req.body.pollId})
  let n = {}
  n.username = "vishaka.mohan@fidelity.com"
  ans = []
  f = 0

  //change this later
  if(currPoll.responses.length === 0){
    for (var prop in req.body) {
          
        if(prop != "cid" && prop != "pollId"){
          log.info(req.body[prop])
          ans.push(req.body[prop])
        }
    }

    //n.answers = ans

    currPoll.responses.push({
      username : "vishaka.mohan@fidelity.com",
      answers : ans
  })
    await currPoll.save()
  }
  else{
    for(var i = 0; i < currPoll.responses.length; i++){

      if(currPoll.responses[i].username === "vishaka.mohan@fidelity.com"){
        for (var prop in req.body) {
          
            if(prop != "cid" && prop != "pollId"){
              log.info(req.body[prop])
              ans.push(req.body[prop])
            }
        }
  
        currPoll.responses[i].answers = ans
  
        //currPoll.responses.push(n)
        await currPoll.save()
        f = 1
        break
      }
      
    }
  
  }
  
  

  res.redirect('/emp/viewPolls')


}


module.exports =  {
  
  viewPolls,
  getIndividualPoll,
  submitPoll
  
};


