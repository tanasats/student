const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

exports.getall = (req, res) =>{
    userModel.getall()
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
}


exports.delete = (req, res) => {
  if (req.params.id) {
    userModel
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
  //const id = req.params.id;
  const username = req.params.username;
  const datas = req.body;
  if (Object.keys(datas).length === 0) {
    // empty datas
    return res.status(400).send({ message: "Invalid request parameter" });
  }
  if (username) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
    delete datas.cdate;
    datas.mdate = new Date();
    
    userModel
      .update({ username: username, datas: datas })
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
  const datas = req.body;
  datas.cdate = new Date();
  datas.mdate = new Date();
  if (req.body.username) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
    console.log("data:", datas);
    userModel
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

exports.getbyusername = (req, res) =>{
  const username = req.params.username;
  userModel.getbyusername(username)
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}