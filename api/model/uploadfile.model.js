const util = require("util");
const multer = require("multer");
const path = require("path");
const maxSize = 5 * 1024 * 1024;

// Multer Storage
let multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __upload_dir + "/document/");
  },
  filename: (req, file, cb) => {
    console.log("doc-Upload:",file.originalname);
    console.log("doc-Upload ext:",path.extname(file.originalname));
    const timestamp = new Date();
    console.log("doc-new name:",timestamp.valueOf());
    const fileName = timestamp.valueOf();
    const fileExt = path.extname(file.originalname);
    console.log("new filename:",filename+fileExt);
    //cb(null, file.originalname);
    cb(null, fileName+fileExt)
  },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (
    //file.mimetype == "image/png" ||
    //file.mimetype == "image/jpeg" ||
    //file.mimetype == "image/jpg" ||
    file.mimetype == "application/pdf" ||
    file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format !!"), false);
  }
};

let uploadFile = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: maxSize },
}).fields([{ name: "file", maxCount: 1 }]);
//.single("file");

//const uploadavatar = multer().single('avatar')

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
