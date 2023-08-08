const { v4: uuidv4 } = require('uuid');
const checkinModel = require("../model/checkin.model");

exports.checkin = async (req, res) => {
  const enroll_token = req.params.enroll_token;
  if (req.params.enroll_token) {
    checkinModel
      .checkin({ enroll_token: enroll_token })
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
          res.status(400).send(error);
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