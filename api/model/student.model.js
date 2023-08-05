const { promise } = require("bcrypt/promises");
const db = require("../config/db");

class _Class {

  filter({page,pagesize,keyword}){
    let sql = db.format("SELECT * FROM  student WHERE studentcode like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    return db.query(sql);
  }
  countfilter({keyword}) {
    let sql = db.format("SELECT count(*) as value FROM student WHERE studentcode like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  getall() {
    const sql = db.format("SELECT * FROM student");
    return db.execute(sql);
  }



  create({ datas }) {
    const sql = db.format("INSERT INTO student SET ?", [datas]);
    console.log(sql);
    return db.query(sql);
  }
  update({ username, datas }) {
    const sql = db.format("UPDATE student SET ? WHERE username=?", [
      datas,
      username,
    ]);
    return db.query(sql);
  }
  delete({ id }) {
    const sql = db.format("DELETE FROM student WHERE user_id=?", [id]);
    return db.execute(sql);
  }

  getbyStudentcode(studentcode = "") {
    const sql = db.format("SELECT * FROM student WHERE student.studentcode like ?", [studentcode+'%',]);
    console.log("sql: ",sql)
      return db.execute(sql);
  }
} //class

const ClassModel = new _Class();
module.exports = ClassModel;
