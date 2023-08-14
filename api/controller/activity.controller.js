const activityModel = require("../model/activity.model");

exports.getall = async (req, res) => {
  activityModel
    .getall()
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      //--console.log(error);
      res.status(200).json(row);
    });
};

exports.getallpublish = async (req,res)=>{
  const activity_year = parseInt(req.params.year)||0;
  
  activityModel
  .getallpublish({activity_year:activity_year})
  .then(([rows]) => {
    let datas = rows.map((item)=>{
      delete item.activity_budget;
      delete item.activity_budget_source;
      delete item.activity_budget_paid;
      return item;
    })
    res.status(200).json(datas);
  })
  .catch((error) => {
    res.status(200).json(rows);
  });
}

// exports.paging = async (req,res) => {
//   activityModel.rowcount().then((rows)=>{
//     res.status(200).json(rows);
//   }).catch((err)=>{
//     //--console.log(err);
//     res.status(400).send(err)
//   })
// }

exports.filter = async (req, res) => {
  
  let user_id = req.user_id;
  let user_type = req.user_type;
  let role_max = req.role_max;
  let studentcode = req.studentcode;
  let user_faculty_id = req.user_faculty_id; 
  let user_faculty_name = req.user_faculty_name;
  
  //--console.log("user_id:",req.user_id) //<-- user_id from token 
  //--console.log("user_facluty_name:",req.user_faculty_name);
  //--console.log("role_max:",req.role_max);

  let page = parseInt(req.query.page)||1;
  let limit = parseInt(req.query.limit)||999999;
  let code = req.query.code||'';
  let name = req.query.name||'';
  let publish = req.query.publish||'';
  let status = req.query.status||'';
  let ticket = req.query.ticket ||'';

  // let status = req.query.status||'';
  if(code.length<3) code='';
  if(name.length<3) name='';

  activityModel
    .filter({ 
      user_id: user_id, 
      user_type: user_type, 
      role_max: role_max, 
      user_faculty_name: user_faculty_name, 
      page:page, limit: limit, code:code, name:name, publish:publish, status:status, ticket:ticket})
    .then((rows) => {
      rows.items = rows.items.map((item)=>{
          delete item.activity_budget;
          delete item.activity_budget_paid;
          delete item.activity_budget_source;
        return item;
      })
      res.status(200).send(rows);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.oldfilter = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pagesize = parseInt(req.query.pagesize) || 10;
    let keyword = req.query.keyword || "";
    const [[_results], [[_count]]] = await Promise.all([
      activityModel.filter({
        page: page,
        pagesize: pagesize,
        keyword: keyword,
      }),
      activityModel.countfilter({ keyword: keyword }),
    ]);
    return res.status(200).json({
      currentpage: page,
      totalpage: Math.ceil(_count.value / pagesize),
      pagesize: pagesize,
      itemscount: _count.value,
      items: _results,
    });
  } catch (error) {
    //--console.log(error);
    res.status(400).json(error);
  }
};

exports.current = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pagesize = parseInt(req.query.pagesize) || 10;
    const [[_results], [[_count]]] = await Promise.all([
      activityModel.current({
        page: page,
        pagesize: pagesize,
      }),
      activityModel.countCurrent({ keyword: "" }),
    ]);
    return res.status(200).json({
      currentpage: page,
      totalpage: Math.ceil(_count.value / pagesize),
      pagesize: pagesize,
      itemscount: _count.value,
      items: _results,
    });
  } catch (error) {
    //--console.log(error);
    res.status(400).json(error);
  }
};

exports.getById = (req, res) => {
  activityModel
    .getById({ id: req.params.id })
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      //--console.log(error);
      res.status(400).send(error);
    });
};

exports.delete = (req, res) => {
  if (req.params.id) {
    activityModel
      .delete({ id: req.params.id })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        //--console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send("Invalid request parameter");
  }
};

exports.getRegisterUsers = (req, res) => {
  const id = req.params.id;
  activityModel
    .getRegisterUsers({ id: id })
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getUserActivity = (req, res) => {
  const id = req.params.id;
  activityModel
    .getuseractivity({ id: id })
    .then(([row]) => {
      //--console.log(row);
      res.status(200).json(row);
    })
    .catch((error) => {
      //--console.log(row);
      res.status(400).send(error);
    });
};

exports.getNextSeq = (req, res) => {
  const code = req.params.code;
  activityModel
    .getnextseq({ code: code })
    .then(([[row]]) => {
      row.max;
      res.status(200).json(row);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const datas = req.body;
  if (Object.keys(datas).length === 0) {
    // empty datas
    return res.status(400).send({ message: "Invalid request parameter" });
  }
  const owner = req.user_id;
//  //--console.log("create owner:",owner)
  //datas.cowner = owner;
  datas.mowner = owner;  

  if (req.params.id) {
    delete datas.cdate;
    delete datas.cowner;
    datas.mdate = new Date();
    //--console.log("update activity datas:",datas);
    activityModel
      .update({ id: id, datas: datas })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        //--console.log(error);
        // if (error.message) {
        //   return res.status(400).send({ message: error.message });
        // }
        if (error.sqlMessage) error.sqlMessage;
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.create = async (req, res) => {
  //--console.log(req.body);
  const datas = req.body;
  const owner = req.user_id;
  const faculty_id = req.user_faculty_id;
  const faculty_name = req.user_faculty_name;

  datas.cowner = owner;
  datas.mowner = owner;  
  datas.faculty_id= faculty_id;
  datas.faculty_name= faculty_name

  //--console.log("create activity owner:",owner)
  //--console.log("activity faculty owner:",faculty_name)


  
  if (req.body.activity_name) { 
    //--console.log("data:", datas);
    activityModel
      .create({ datas: datas })
      .then(([row]) => {
        //--console.log("create()->result:", row);
        res.status(200).json(row);
      })
      .catch((error) => {
        //--console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

const uploadFile = require("../middleware/upload");
const { subscribe } = require("../route/faculty.route");
exports.upload = async (req, res) => {
  //--console.log("upload()");
  //--console.log(req.body);
  //--console.log(req.files);
  try {
    uploadFile(req, res, function (err) {
      if (err) {
        //--console.log(err);
        res.status(400).send(err);
        //res.status(401).send("Upload failed!");// เขียน DB ไม่ได้ ต้องกลับไปลบ ไฟล์ออกด้วย
      } else {
        activityModel
          .updatePoster({
            id: req.body.id,
            filename: req.file.originalname,
            caption: req.body.caption,
          })
          .then(([row]) => {
            //--console.log("updatePoster()->result:", row);
            if (row.affectedRows == 1) {
              res.status(200).send({
                message:
                  "Uploaded the file successfully: " + req.file.originalname,
              });
            } else {
              res.status(401).send("Upload failed!"); // เขียน DB ไม่ได้ ต้องกลับไปลบ ไฟล์ออกด้วย
            }
          })
          .catch((error) => {
            //--console.log(error);
            res.status(400).send(error);
          });
      }
    });

    //await uploadFile(req, res);
    // if (req.file == undefined) {
    //   return res.status(400).send({ message: "Please upload a file!" });
    // }
    // activityModel.updatePoster({id:req.body.id,filename:req.file.originalname,caption:req.body.caption})
    // .then(([row])=>{
    //   //--console.log("updatePoster()->result:", row);
    //   if(row.affectedRows==1){
    //     res.status(200).send({ message: "Uploaded the file successfully: " + req.file.originalname,  });
    //   }else{
    //     res.status(401).send("Upload failed!");// เขียน DB ไม่ได้ ต้องกลับไปลบ ไฟล์ออกด้วย
    //   }
    // })
    // .catch((error)=>{
    //   //--console.log(error);
    //   res.status(400).send(error);
    // })
  } catch (err) {
    //--console.log(`${err}`);
    res.status(500).send({
      message: `${err}`,
    });
  }
};
