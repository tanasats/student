const db = require("../config/db");

class _class {
  // sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  getbytoken({ enroll_token }) {
    let sql = db.format("SELECT * FROM enroll WHERE enroll_token=?", [ enroll_token ]);
    return db.query(sql);
  }

  checkin({ activity_id, enroll_token, mowner }) {
    let sql = db.format(
      "UPDATE enroll SET activity_checkin=1, activity_checkin_date=CURRENT_TIMESTAMP(), mowner=? WHERE activity_id=? and enroll_token=?",
      [mowner, activity_id, enroll_token]
    );
    console.log(sql);
    return db.query(sql);
  }

  cancelcheckin({ activity_id, enroll_token, mowner }) {
    let sql = db.format(
      "UPDATE enroll SET activity_checkin=null, activity_checkin_date=null, mowner=? WHERE activity_id=? and enroll_token=?",
      [mowner, activity_id, enroll_token]
    );
    console.log(sql);
    return db.query(sql);
  }

  async checkinlist(students, mowner) {
    const checkinResult = await Promise.all(
      students.map((item) => {
        let sql =
          "UPDATE enroll SET activity_checkin=1,activity_checkin_date=CURRENT_TIMESTAMP(),mowner=? WHERE enroll_token=?";
        let val = [mowner, item.enroll_token];
        return db.query(sql, val);
      })
    );
    const sumAffectedRows = checkinResult.reduce((acc, cur) => {
      return (acc += cur[0].affectedRows);
    }, 0);
    return [{ success: true, affectedRows: sumAffectedRows }];
  }

  async cancelcheckinlist(students, mowner) {
    const checkinResult = await Promise.all(
      students.map((item) => {
        let sql =
          "UPDATE enroll SET activity_checkin=null,activity_checkin_date=null,mowner=? WHERE enroll_token=?";
        let val = [mowner, item.enroll_token];
        return db.query(sql, val);
      })
    );
    const sumAffectedRows = checkinResult.reduce((acc, cur) => {
      return (acc += cur[0].affectedRows);
    }, 0);
    return [{ success: true, affectedRows: sumAffectedRows }];
  }


  // async checkinlist(students,mowner){  //===> not work
  //   console.log("checkinlist.model")
  //   let counter=0;
  //   try{
  //     const checkinProcess = students.map((item)=>{
  //       console.log(mowner,item.activity_id,item.enroll_token);
  //       let sql = db.format("UPDATE enroll SET activity_checkin=1, activity_checkin_date=CURRENT_TIMESTAMP(), mowner=? WHERE activity_id=? and enroll_token=?"
  //       ,[mowner,item.activity_id,item.enroll_token]);
  //       db.query(sql).then(([row])=>{
  //           console.log(row.affectedRows);
  //           return(row.affectedRows);
  //         }).catch((err)=>{
  //           console.log(err);
  //         });
  //     });
  //     const result = await Promise.all(checkinProcess)
  //     console.log(result);
  //     console.log("------------------")
  //   }catch(error){
  //     console.log('Error implement list data:',error)
  //   }
  //   // finally{
  //   //   console.log('finally import list');
  //   //   return [{'success':true}]
  //   // }
  // }

  // async checkinlist(students,mowner){ //not work!!!!
  //   const sql = `UPDATE enroll SET activity_checkin=1, activity_checkin_date=CURRENT_TIMESTAMP(), mowner=? WHERE activity_id=? and enroll_token=?;`
  //   const values = students.map((item)=>{
  //     return {mowner:mowner,activity_id:item.activity_id, enroll_token:item.enroll_token}
  //   });
  //   console.log(values)
  //   return db.query(sql,values);
  // }


} //class

let ClassModel = new _class();
module.exports = ClassModel;
