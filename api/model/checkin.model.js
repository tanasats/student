const db = require("../config/db");

class _class { 

  checkin({ activity_id,enroll_token,mowner}) {
    let sql = db.format("UPDATE enroll SET activity_checkin=1, activity_checkin_date=CURRENT_TIMESTAMP(), mowner=? WHERE activity_id=? and enroll_token=?", [mowner,activity_id,enroll_token]);
    console.log(sql)
    return db.query(sql); 
  }
  getbytoken({enroll_token}) {
    let sql = db.format("SELECT * FROM enroll WHERE enroll_token=?", [enroll_token]);
    return db.query(sql);
  }

}//class

let ClassModel = new _class();
module.exports = ClassModel;
