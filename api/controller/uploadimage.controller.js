const uploadImage = require("../model/uploadimage.model");
const fs = require("fs"); 

const upload = async (req, res) => {
  console.log(req);
  try {
    await uploadImage(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      //message: "Uploaded the file successfully: " + req.file.originalname,
      message: "Uploaded the file successfully: " + req.file.filename, 
      file:req.file
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __upload_dir + "/picture/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        // url: _baseUrl + file,
        url: 'http://localhost:3001/api/file/' + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __upload_dir + "/picture/";
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