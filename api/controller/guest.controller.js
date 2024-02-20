const guestModel = require("../model/guest.model");

exports.activity = async (req,res) => {
  guestModel.activity()
  .then(([row]) => {
    res.status(200).json(row);
  })
  .catch((error) => {
    console.log(error);
    res.status(400).send(error);
  });
}
