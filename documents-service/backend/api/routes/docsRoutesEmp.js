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

const { empDashboard,
    viewChecklist,
    uploadDocs,
    
    
} = require("../controllers/docsControllerEmp");

router.get('/empDashboard', empDashboard);
router.get('/viewChecklist', viewChecklist);
router.post('/uploadDocs', upload.single('file') , uploadDocs);


//router.post('/updateDocs', updateDocs);

  

module.exports = router;
