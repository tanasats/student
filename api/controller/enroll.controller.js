const { v4: uuidv4 } = require('uuid');
const enrollModel = require("../model/enroll.model");
const activityModel = require("../model/activity.model");

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
      .delete({ id: req.params.id})
      .then(([row]) => {
        //console.log(row);
        enrollModel.decRegister({activity_id:req.params.activity_id,val:1}); // decresing registered number
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
  //console.log(req.body);
  const datas = req.body;
  datas.cowner = req.user_id;
  datas.cdate = new Date();
  datas.mdate = new Date();
  datas.enroll_token = uuidv4();
  

  // await activityModel.isregisterfull(datas.activity_id).then( ([row]) =>{
  //   console.log("isregisterfull:",row[0]);
  // })
  // console.log("afterthat-----");

  if (datas.studentcode&&datas.activity_id&&datas.enroll_position) {
    console.log("data:", datas);
    enrollModel 
      .create({ datas: datas })
      .then(([row]) => {
        console.log("create()->result:", row);
        if(row.affectedRows==1){
          console.log("add register counter");
          enrollModel.incRegister({activity_id:datas.activity_id,val:1})
          .then(([row]) => {
               console.log("update register counter:",row); 
            })
        }
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
  const pagesize = parseInt(req.query.pagesize) ||10000; 
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

exports.myenroll = async (req,res) => {
  let studentcode = req.user_studentcode;
  console.log("myenroll("+studentcode+")");
  enrollModel.myenroll(studentcode)
  .then(([row])=>{
    res.status(200).json(row);
  })
  .catch((error)=>{
    console.log(error);
    res.status(400).send(error);
  })
};

exports.enrollimport = async (req,res) => {
  const students = req.body;
  enrollModel.enrollimport(students)
  .then((row) =>{
    console.log('Data List imported success.',row);
    res.status(200).send(row)
  })
  .catch((error) =>{
    console.error(error);
    res.status(400).send(error);
  })
  
}