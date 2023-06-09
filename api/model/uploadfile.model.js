const util = require("util");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024;

// Multer Storage
let multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == "application/pdf" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
