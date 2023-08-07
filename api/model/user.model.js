const db = require("../config/db");

class _Class {
  getall() {
    const sql = db.format("SELECT * FROM user");
    return db.execute(sql);
  }

  create({ datas }) {
    const sql = db.format("INSERT INTO user SET ?", [datas]);
    console.log(sql);
    return db.query(sql);
  }
  update({ username, datas }) {
    const sql = db.format("UPDATE user SET ? WHERE username=?", [datas, username]);
    return db.query(sql);
  }
  delete({ id }) {
    const sql = db.format("DELETE FROM user WHERE user_id=?", [id]);
    return db.execute(sql);
  }

  getbyusername(username = "") {
    const sql = db.format("SELECT * FROM user WHERE user.username = ?", [username]);
    return db.execute(sql);
  }
  getbyid(id = "") {
    const sql = db.format("SELECT * FROM user WHERE user.user_id = ?", [id]);
    return db.execute(sql);
  }


} //class

const ClassModel = new _Class();
module.exports = ClassModel;
