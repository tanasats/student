const util = require("util");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const maxSize = 5 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    console.log("Upload:",file.originalname);
    console.log("Upload ext:",path.extname(file.originalname));
    const timestamp = new Date();
    console.log("new name:",timestamp.valueOf());

    //const fileName = file.originalname.toLowerCase().split(' ').join('_');
    const fileName = timestamp.valueOf();
    const fileExt = path.extname(file.originalname);
    cb(null, fileName+fileExt)
  }, 
}); 

let uploadImage = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb('Only .png, .jpg and .jpeg format allowed!',false);
      //cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      //return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));//-->status=500, {Error:"Only .png .jpg and jpg format allowed!"}
    }
  },
}).single("file");

let uploadImageMiddleware = util.promisify(uploadImage);
module.exports = uploadImageMiddleware;