const { v4: uuidv4 } = require('uuid');
const checkinModel = require("../model/checkin.model");

exports.checkin = async (req, res) => {
  const activity_id = req.params.activity_id;
  const enroll_token = req.params.enroll_token;
  const mowner = req.user_id;
  if (activity_id && enroll_token && mowner) {
    checkinModel
      .checkin({ activity_id:activity_id,enroll_token: enroll_token,mowner:mowner })
      .then(([row]) => {
        if(row.affectedRows==1){
          checkinModel.getbytoken({ enroll_token: enroll_token })
          .then(([row]) =>{
            res.status(200).json(row);
          })
          .catch((error) => {
            res.status(400).send(error);
          })
        }else{
          res.status(400).send('ไม่พบ QR Code'); 
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.cancelcheckin = async (req, res) => {
  const activity_id = req.params.activity_id;
  const enroll_token = req.params.enroll_token;
  const mowner = req.user_id;
  if (activity_id && enroll_token && mowner) {
    checkinModel
      .cancelcheckin({ activity_id:activity_id,enroll_token: enroll_token,mowner:mowner })
      .then(([row]) => {
        if(row.affectedRows==1){
          checkinModel.getbytoken({ enroll_token: enroll_token })
          .then(([row]) =>{
            res.status(200).json(row);
          })
          .catch((error) => {
            res.status(400).send(error);
          })
        }else{
          res.status(400).send('ไม่พบ QR Code'); 
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.checkinlist = async (req,res) => {
  const students = req.body;
  const mowner = req.user_id;
  checkinModel.checkinlist(students,mowner)
  .then((row) =>{
    console.log("checkinlist.controller:",row);
    res.status(200).send(row);
  })
  .catch((error) =>{
    console.log(error);
    res.status(500).send(error);
  })
};

exports.cancelcheckinlist = async (req,res) => {
  const students = req.body;
  const mowner = req.user_id;
  checkinModel.cancelcheckinlist(students,mowner)
  .then((row) =>{
    console.log("checkinlist.controller:",row);
    res.status(200).send(row);
  })
  .catch((error) =>{
    console.log(error);
    res.status(500).send(error);
  })
};