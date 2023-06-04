const docfileModel = require("../model/docfile.model");
const uploadDocFile = require("../model/uploaddocfile.model");

exports.getall = async (req, res) => {
  docfileModel
    .getall()
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

exports.filter = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pagesize = parseInt(req.query.pagesize) || 10;
    let keyword = req.query.keyword || "";
    const [[_results], [[_count]]] = await Promise.all([
      docfileModel.filter({ page: page, pagesize: pagesize, keyword: keyword }),
      docfileModel.countfilter({ keyword: keyword }),
    ]);
    return res.status(200).json({
      currentpage: page,
      totalpage: Math.ceil(_count.value / pagesize),
      pagesize: pagesize,
      itemscount: _count.value,
      items: _results,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getbyId = (req, res) => {
  docfileModel
    .getbyId({ id: req.params.id })
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

exports.delete = (req, res) => {
  if (req.params.id) {
    docfileModel
      .delete({ id: req.params.id })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send("Invalid request parameter");
  }
};

exports.getbyTable = async (req, res) => {
  const ref_table_name = req.params.tablename;
  const ref_table_id =req.params.tableid;
  const ref_user_id = req.params.userid;
  if (ref_table_name && ref_table_id && ref_user_id) {
    docfileModel
      .getbyTable({ ref_table_name: ref_table_name,ref_table_id:ref_table_id, ref_user_id: ref_user_id })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });

  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};


exports.update = async (req, res) => {
  const id = req.params.id;
  const datas = req.body;
  if (Object.keys(datas).length === 0) {
    // empty datas
    return res.status(400).send({ message: "Invalid request parameter" });
  }
  if (req.params.id) {
    // if (datas.password) {
    //   const saltRound = 10;
    //   const salt = await bcrypt.genSalt(saltRound);
    //   datas.password = await bcrypt.hash(datas.password, salt);
    // }
    delete datas.cdate;
    datas.mdate = new Date();
    docfileModel
      .update({ id: id, datas: datas })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        // if (error.message) {
        //   return res.status(400).send({ message: error.message });
        // }
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.create = async (req, res) => {
  console.log(req.body);
  const datas = req.body;
  // datas.cdate = new Date();
  // datas.mdate = new Date();
  if (req.body.docfile_title) {
    console.log("data:", datas);
    docfileModel
      .create({ datas: datas })
      .then(([row]) => {
        console.log("create()->result:", row);
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.upload = async (req, res) => {
  console.log("uploaddocfile.controller");
  try {
    await uploadDocFile(req, res);
    //---After file Uploaded success----//
    //---get field in form
    console.log("req.files.file: ", req.files.file);
    console.log(
      "req.body.docfile_title after uploadfle:",
      req.body.docfile_title
    );
    const docfile_datas = {
      docfile_id: null,
      docfile_title: req.body.docfile_title,
      docfile_description: req.body.docfile_description,
      //docfile_filename: req.files.file[0].filename,
      docfile_filename: req.body.docfile_filename,
      docfile_filetype: req.files.file[0].mimetype,
      docfile_filesize: req.files.file[0].size,
    //docfile_ref_user_id: req.body.docfile_ref_user_id,
      docfile_ref_user_id: req.user_id,
      docfile_ref_table_name: req.body.docfile_ref_table_name,
      docfile_ref_table_id: req.body.docfile_ref_table_id,
    };
    console.log(docfile_datas);

    docfileModel
      .create({ datas: docfile_datas })
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
