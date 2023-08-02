const picfileUpload = require("../model/picfileupload.model");
const fs = require("fs");
const stream = require('stream')
const baseUrl = "http://localhost:3000/api/file/";

const docfileModel = require("../model/docfile.model");

const upload = async (req, res) => {
  console.log("upload.controller");
  console.log("req.body.description:", req.body.description);
  try {
    await picfileUpload(req, res);
    //---After file Uploaded success----//
    //---get field in form
    console.log("req.files.file: ", req.files.file);
    console.log("req.body.description after uploadfle:", req.body.description);

    res.status(200).json({
      status: "success",
      message: "File created successfully!!",
      file: {
        filename: req.files.file[0].filename,
        mimetype: req.files.file[0].mimetype,
        size: req.files.file[0].size,
      },
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


const picturefile = (req,res)=>{
  const filename = req.params.name;
  const directory = __basedir + "/uploads/";
  console.log(directory+filename);
  const r = fs.createReadStream(directory+filename);
  const ps = new stream.PassThrough();
  stream.pipeline(
    r,
    ps, // <---- this makes a trick with stream error handling
    (err) => {
     if (err) {
       console.log(err) // No such file or any other kind of error
       return res.sendStatus(400); 
     }
   })
   ps.pipe(res) 
}

const docfileUpload = async (req, res) => {
  console.log("docfileUpload.controller");
  try {
    await picfileUpload(req, res);
    //---After file Uploaded success----//
    //---get field in form
    // console.log("req.files.file: ",req.files.file);
    // console.log("docfile_title:",req.body.docfile_title);
    // console.log("docfile_description:",req.body.docfile_description);
    // console.log("docfile_filename:",req.files.file[0].filename);
    // console.log("docfile_filetype:",req.files.file[0].mimetype);
    const docfile_datas = {
      docfile_id: null,
      docfile_title: req.body.docfile_title,
      docfile_description: req.body.docfile_description,
      docfile_filename: req.files.file[0].filename,
      docfile_filetype: req.files.file[0].mimetype,
      docfile_ref_user_id: 1,
      docfile_ref_table_name: "activity",
      docfile_ref_table_id: 1,
    };
    console.log(docfile_datas);

    docfileModel
      .create({datas:docfile_datas})
      .then(([row]) => {
        if (row.affectedRows == 1) {
          // res.status(200).json(row);
          res.status(200).json({
            status: "success",
            message: "File created successfully!!",
            file: {
              filename: req.files.file[0].filename,
              mimetype: req.files.file[0].mimetype,
              size: req.files.file[0].size,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
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

module.exports = {
  upload,
  getListFiles,
  download,
  picturefile,
  docfileUpload,
};
