const multer = require("multer");
const path = require("path")

//multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req,file,cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg' && ext !== '.PDF' && ext !== '.pdf' && ext !== '.docx' && ext !== '.doc'){
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true)
    }
})