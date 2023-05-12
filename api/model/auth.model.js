const { promise } = require("bcrypt/promises");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class _Class {
  signin(username, password) {
    let sql = db.format("SELECT * FROM user WHERE username=? AND password=?", [
      username,
      password,
    ]);
    return db.execute(sql);
  }

  ishasuser(username) {
    return new Promise((resolve, reject) => {
      let sql = db.format("SELECT * FROM user WHERE username=?", [username]);
      //db.execute(sql);
      db.query(sql, (err, data) => {
        if (err) {
          reject(false);
        }
        if (data.length == 1) {
          resolve(true);
        }
        reject(false);
      });
    });
  }

  findUsername(username) {
    let sql = db.format("SELECT * FROM user WHERE username=?", [username]);
    return db.execute(sql);
  }

  register(datas) {
    const sql = db.format("INSERT INTO user SET ?", [datas]);
    console.log(sql);
    return db.execute(sql);
  }
  
  setpassword(password, username) {
    const sql = db.format("UPDATE user SET password=? WHERE username=?", [
      password,
      username,
    ]);
    console.log(sql);
    return db.query(sql);
  }

  addRole(user_id, role_id) {
    const datas = {
      user_id: user_id,
      role_id: role_id,
    };
    const sql = db.format("INSERT INTO userrole SET ?", [datas]);
    console.log(sql);
    return db.query(sql);
  }



  get_faculty_id(facultyname) {
    const sql = db.format(
      "SELECT faculty_id FROM faculty WHERE faculty_name=?",
      [facultyname]
    );
    return db.query(sql);
  }
} //class

let ClassModel = new _Class();
module.exports = ClassModel;
