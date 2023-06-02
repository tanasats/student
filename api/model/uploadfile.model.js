const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
// Multer Storage
let multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
}); 
// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

//  fileFilter: multerFilter,

let uploadFile = multer({
  storage: multerStorage,

  limits: { fileSize: maxSize },
}).single("file");


//const uploadavatar = multer().single('avatar')



let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;