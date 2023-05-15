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
    return db.execute(sql);
  }

  useractivity(user_id,activity_id){
    let sql = db.format("SELECT * FROM enroll WHERE user_id = ? and activity_id = ?", [user_id,activity_id]);
    return db.execute(sql);
  }
  activitybyuser(user_id){
    let sql = db.format("SELECT activity.* FROM enroll left join activity on enroll.activity_id=activity.activity_id WHERE enroll.user_id = ?", [user_id]);
    return db.execute(sql);
  }

}//class

let ClassModel = new _class();
module.exports = ClassModel;
