const express = require("express");
const router = express.Router();
const config = require("../config")[process.env.NODE_ENV || "development"];
const fileUpload = require('express-fileupload');
const upload = require("../config/multer")
const log = config.log();
/*const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dpsmilpng', 
    api_key: '369879681634961', 
    api_secret: 'MsmXoTOP9OaZaJGbVuLjzhoNEuo' 
  });*/

const { 
    viewPolls,
    getIndividualPoll,
    submitPoll
    
} = require("../controllers/pollsControllerEmp");


router.get('/viewPolls', viewPolls)
router.get('/:cid/:pollId', getIndividualPoll)
router.post('/submitPoll', submitPoll)

//router.post('/updateDocs', updateDocs);

  

module.exports = router;
