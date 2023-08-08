const db = require("../config/db");

class _class { 

  checkin({ enroll_token}) {
    let sql = db.format("UPDATE enroll SET activity_checkin=1, activity_checkin_date=CURRENT_TIMESTAMP() WHERE enroll_token=?", [enroll_token]);
    return db.query(sql);
  }
  getbytoken({enroll_token}) {
    let sql = db.format("SELECT * FROM enroll WHERE enroll_token=?", [enroll_token]);
    return db.query(sql);
  }

}//class

let ClassModel = new _class();
module.exports = ClassModel;
