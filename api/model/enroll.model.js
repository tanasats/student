const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class _class {
  getall() {
    let sql = db.format("SELECT * FROM enroll");
    return db.execute(sql);
  }
  getById({ id = "" }) {
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
    //console.log("enroll delete sql: ",sql);
    return db.execute(sql);
  }

  incRegister({ activity_id, val }) {
    let sql = db.format(
      "UPDATE activity SET activity_register=activity_register+? where activity_id=?",
      [val, activity_id]
    );
    console.log(sql);
    return db.execute(sql);
  }

  decRegister({ activity_id, val }) {
    let sql = db.format(
      "UPDATE activity SET activity_register=activity_register-? where activity_id=?",
      [val, activity_id]
    );
    console.log(sql);
    return db.execute(sql);
  }

  useractivity(studentcode, activity_id) {
    let sql = db.format(
      "SELECT * FROM enroll WHERE studentcode = ? and activity_id = ?",
      [studentcode, activity_id]
    );
    return db.execute(sql);
  }
  activitybyuser(studentcode) {
    let sql = db.format(
      "SELECT activity.* FROM enroll left join activity on enroll.activity_id=activity.activity_id WHERE enroll.studentcode = ?",
      [studentcode]
    );
    return db.execute(sql);
  }

  registrant(activity_id, keyword, page, pagesize) {
    //let query = "select * from enroll left join student on enroll.studentcode=student.studentcode where enroll.activity_id=? and enroll.studentcode like ? limit ?,?";
    let query =
      "select enroll.*,u2.fullname as mowner_name,u1.faculty_name,u1.program,u1.email,u1.mobilephone from enroll left join user u1 on enroll.studentcode=u1.studentcode left join user u2 on enroll.mowner=u2.user_id where enroll.activity_id=? and enroll.studentcode like ? limit ?,?";
    let sql = db.format(query, [
      activity_id,
      "%" + keyword + "%",
      (page - 1) * pagesize,
      pagesize,
    ]);
    console.log("registrant sql=", sql);
    return db.execute(sql);
  }

  countfilter({ keyword }) {
    let sql = db.format(
      "SELECT count(*) as value FROM agency WHERE agency_name like ?",
      ["%" + keyword + "%"]
    );
    return db.execute(sql);
  }

  myenroll(studentcode) {
    let sql = db.format(
      "SELECT * FROM enroll LEFT JOIN activity ON enroll.activity_id=activity.activity_id WHERE enroll.studentcode=?",
      [studentcode]
    );
    console.log(sql);
    return db.execute(sql);
  }

  // async enrollimport(datas){
  //   console.log('datas:',datas);
  //   let rowcount=0;
  //   let errcount=0;
  //   try{
  //     const importQuerys = datas.map((item)=>{
  //       item.enroll_token = uuidv4();
  //       console.log('item:',item);
  //       let result = db.query('INSERT INTO enroll SET activity_id=?,studentcode=?,studentname=?,enroll_position=?,enroll_token=?',[item.activity_id,item.studentcode,item.studentname,'C',item.enroll_token])
  //       rowcount++;
  //       return result;
  //     });
  //     await Promise.all(importQuerys);
  //     console.log('Data import successfully!');
  //     //return {success:true,message:'ok'};
  //   }catch(error){
  //     console.log('Error importing data:',error);
  //     errcount++;
  //   }finally{
  //     console.log('finally import');
  //     //close db connection
  //     return {'success':true,'rowcount':rowcount,'errcount':errcount};;
  //   }
  // }

  async enrollimport(datas) {
    try {
      const insertEnroll = datas.map((item) => {
        return new Promise((resolve, reject) => {
          item.enroll_token = uuidv4();
          let sql = "INSERT INTO enroll SET activity_id=?,studentcode=?,studentname=?,enroll_position=?,enroll_token=?";
          let val = [item.activity_id,item.studentcode,item.studentname,"C",item.enroll_token];
          db.query(sql, val)
            .then((result) => {
              resolve(result[0].affectedRows);
            })
            .catch((error) => {
              if (error.code === "ER_DUP_ENTRY") {
                //console.log("Duplicate entry for: ", item.studentcode);
                //resolve({ message: "Duplicate entry" });
                resolve(0);
              } else {
                //reject(error);
                resolve(0);
              }
            });
        });
      }); //<--insertEnroll
      const results = await Promise.all(insertEnroll);
      console.log("Insert results:", results);
      const sumAffectedRows = results.reduce((acc, cur) => {
        return (acc += cur);
      }, 0);
      await this.updateActivityRegistered(datas[0].activity_id)
      return { success: true, affectedRows: sumAffectedRows };

    } catch (err) {
      console.log(err);
    }
  }


  async updateActivityRegistered(activity_id){
    let sql ="UPDATE activity a INNER JOIN (SELECT activity_id,count(*) as registered from enroll where activity_id=?) b ON a.activity_id=b.activity_id \
    SET a.activity_register=b.registered \
    WHERE a.activity_id= ?";
    return new Promise((resolve,reject)=>{
          db.query(sql,[activity_id,activity_id])
          .then(([res])=>{
              console.log(res);
              resolve(1)
            })
          .catch((err)=>{
              reject(0)
          })
    })
  }


} //class

let ClassModel = new _class();
module.exports = ClassModel;
