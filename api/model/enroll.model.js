const db = require("../config/db");

class _class { 

  getall() {
    let sql = db.format("SELECT * FROM enroll");
    return db.execute(sql);
  }
  getById({id = ""}) {
    let sql = db.format("SELECT * FROM enroll WHERE enroll_id = ?", [id]);
    return db.execute(sql);
  }
  create({ datas }) {
    let sql = db.format("INSERT INTO enroll SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    let sql = db.format("UPDATE enroll SET ? WHERE enroll_id=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    let sql = db.format("DELETE FROM enroll WHERE enroll_id=?", [id]);
    console.log("enroll delete sql: ",sql);
    return db.execute(sql);
  }


  

  useractivity(studentcode,activity_id){
    let sql = db.format("SELECT * FROM enroll WHERE studentcode = ? and activity_id = ?", [studentcode,activity_id]);
    return db.execute(sql);
  }
  activitybyuser(studentcode){
    let sql = db.format("SELECT activity.* FROM enroll left join activity on enroll.activity_id=activity.activity_id WHERE enroll.studentcode = ?", [studentcode]);
    return db.execute(sql);
  }

  registrant(activity_id,keyword,page,pagesize){
    //let query = "select * from enroll left join student on enroll.studentcode=student.studentcode where enroll.activity_id=? and enroll.studentcode like ? limit ?,?";
    let query = "select enroll.*,u2.fullname as mowner_name,u1.faculty_name,u1.program,u1.email,u1.mobilephone from enroll left join user u1 on enroll.studentcode=u1.studentcode left join user u2 on enroll.mowner=u2.user_id where enroll.activity_id=? and enroll.studentcode like ? limit ?,?";
    let sql = db.format(query,[activity_id,'%'+keyword+'%',(page-1)*pagesize,pagesize]);
    console.log("registrant sql=",sql);
    return db.execute(sql);
  }

  countfilter({keyword}) {
    let sql = db.format("SELECT count(*) as value FROM agency WHERE agency_name like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }


  myenroll(studentcode){
    let sql = db.format("SELECT * FROM enroll LEFT JOIN activity ON enroll.activity_id=activity.activity_id WHERE enroll.studentcode=?",[studentcode])
    console.log(sql)
    return db.execute(sql);
  }





}//class

let ClassModel = new _class();
module.exports = ClassModel;
