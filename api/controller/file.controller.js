const uploadFile = require("../model/uploadfile.model");
const fs = require("fs");
const baseUrl = "http://localhost:3000/api/file/";

const upload = async (req, res) => {
  console.log("upload.controller");
  console.log(req.files);
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    //console.log(req.file); //<<-- file uploaded
    res.status(200).json({
      status: "success",
      message: "File created successfully!!",
    });
    //.send({  message: "Uploaded the file successfully: "+req.file.originalname,    });

  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        //status: "error",
        message: "File size cannot be larger than 2MB!",
      }); 
    }
    res.status(500).send({
      //message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      //status: "error",
      message: `Could not upload the file:  ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    } else {
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
      res.status(200).send(fileInfos);
    }
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
