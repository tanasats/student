const { v4: uuidv4 } = require('uuid');
const enrollModel = require("../model/enroll.model");

exports.getall = async (req,res) => {
  enrollModel.getall()
  .then(([row]) => {
    res.status(200).json(row);
  })
  .catch((error) => {
    console.log(error);
    res.status(400).send(error);
  });
}

exports.getById = (req, res) => {
  enrollModel
    .getById({ id: req.params.id })
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
    enrollModel
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
    enrollModel
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
  datas.cdate = new Date();
  datas.mdate = new Date();
  datas.enroll_token = uuidv4();

  if (datas.studentcode&&datas.activity_id&&datas.enroll_position) {
    console.log("data:", datas);
    enrollModel
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

exports.useractivity = async (req,res)=>{
  const studentcode = req.params.studentcode;
  const activity_id = req.params.activity_id;
  if (studentcode&&activity_id) {
    enrollModel
      .useractivity(studentcode,activity_id)
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

exports.activitybyuser = async (req,res)=>{
  const studentcode = req.params.studentcode;
  if (studentcode) {
    enrollModel
      .activitybyuser(studentcode)
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

exports.registrant = async (req,res)=>{
  const activity_id = req.params.activity_id;
  const keyword = req.query.keyword ||'';
  const page = parseInt(req.query.page) ||1;
  const pagesize = parseInt(req.query.pagesize) ||10;



  if(activity_id){
    enrollModel
    .registrant(activity_id,keyword,page,pagesize)
    .then(([row])=>{
      res.status(200).json(row);
    })
    .catch((error)=>{
      console.log(error);
      res.status(400).send(error);
    })
  }
}