const db = require("../config/db");

class _class {
  // basic method
  getall() {
    const sql = db.format("SELECT * FROM activity");
    return db.execute(sql);
  }
  getallpublish({activity_year}) {
    const sql = db.format("SELECT * FROM activity where activity_year=? and activity_publish=1",[activity_year]);
    return db.execute(sql);
  }
  create({ datas }) {
    const sql = db.format("INSERT INTO activity SET ?", [datas]);
    console.log("api create:",sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    const sql = db.format("UPDATE activity SET ? WHERE activity_id=?", [
      datas,
      id,
    ]);
    console.log(sql);
    return db.query(sql);
  }
  delete({ id }) {
    const sql = db.format("DELETE FROM activity WHERE activity_id=?", [id]);
    return db.execute(sql);
  }

  // extra method
  filter({ user_id, user_type, role_max, user_faculty_id, user_faculty_name, page, limit, code, name ,publish ,status ,ticket }) {
    return new Promise((resolve, reject) => {
      const admin_id=[1,5,18,19,21];
      let where_text = "WHERE ";
      console.log("role_max:",role_max);
      if(role_max=='officer'){ 
        where_text = where_text+"cowner =  "+user_id+" AND ";
      }
      if(role_max=='student') {
        where_text = where_text+"activity_faculty like  '%"+user_faculty_name+"%' AND ";
      }
      if (code.length>0)  {
        where_text = "activity_code like '%"+code+"%' AND ";
      }
      if (publish.length>0)  {
        where_text = where_text+"activity_publish =  "+publish+" AND ";
      }
      if (status.length>0)  {
        where_text = where_text+"activity_status =  '"+status+"' AND ";
      }
      if (ticket.length>0)  {
        where_text = where_text+"activity_ticket =  "+ticket+" AND ";
      }

      const sql = db.format(
        "SELECT count(*) as rowcount FROM activity " +
          where_text +
          "activity_name like ? ORDER BY mdate",
        ["%" + name + "%"]
      );
      console.log("filter sql:",sql);
      db.query(sql)
        .then(([rows]) => {
          let totalItems = parseInt(rows[0].rowcount);
          let totalPages = Math.ceil(totalItems / limit);
          let currentPage = page;
          if (page < 0) {
            currentPage = 1;
          } else if (page > totalPages && totalPages > 0) {
            currentPage = totalPages;
          }
          let offset = (currentPage - 1) * limit;
          const sql = db.format(
            "SELECT * FROM activity "+where_text+" activity_name like ? LIMIT ?,?",
            [ "%" + name + "%", offset, limit]
          );
          console.log("filter2 sql ",sql);
          db.query(sql)
            .then(([rows]) => {
              resolve({
                totalItems: totalItems,
                totalPages: totalPages,
                currentPage: currentPage,
                items: rows,
              });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  } //paging




  // rowcount(){
  //   const sql = db.format("SELECT count(*) as rowcount FROM activity");
  //   return db.execute(sql)
  // }

  // rowcount = new Promise((resolve, reject) => {
  //   const sql = db.format("SELECT count(*) as rowcount FROM activity");
  //   db.query(sql, (err, rows, fields) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     resolve(rows);
  //   });
  // });

  rowcount() {
    return new Promise((resolve, reject) => {
      const sql = db.format("SELECT count(*) as rowcount FROM activity");
      console.log(sql);
      db.query(sql)
        .then(([rows]) => {
          let rowcount = rows[0].rowcount;
          resolve(rowcount);
        })
        .catch((err) => {
          reject(err);
        });

      // db.query(sql, (err, rows, fields) => {
      //   if (err) {
      //     console.log(err);
      //     reject(err);
      //   } else {
      //     console.log(rows);
      //     resolve(rows);
      //   }
      // });

      // return resolve({return:'resolve'});
      // return reject({return:'reject'});
    });
  }

  xxx(id) {
    return new Promise(function (resolve, reject) {
      // The Promise constructor should catch any errors thrown on
      // this tick. Alternately, try/catch and reject(err) on catch.
      //var connection = getMySQL_connection();

      var query_str =
        "SELECT activity_code " + "FROM activity " + "WHERE (activity_id = ?) ";

      var query_var = [id];

      db.query(query_str, query_var, function (err, rows, fields) {
        // Call reject on error states,
        // call resolve with results
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(rows);
        resolve(rows);
      });
    });
  }

  getById({ id = "" }) {
    const sql = db.format("SELECT * FROM activity WHERE activity_id = ?", [id]);
    return db.execute(sql);
  }

  // filter({ page, pagesize, keyword }) {
  //   const ref1 =
  //     "(SELECT refcode,refvalue FROM sysreference WHERE reftable='activity' and refcolumn='activity_statuscode')";
  //   const sql = db.format(
  //     "SELECT activity.*,ref1.refvalue as activity_statusvalue FROM  activity LEFT JOIN " +
  //       ref1 +
  //       " ref1 ON activity.activity_statuscode=ref1.refcode WHERE activity_name like ? LIMIT ?,?",
  //     ["%" + keyword + "%", (page - 1) * pagesize, pagesize]
  //   );
  //   console.log(sql);
  //   return db.query(sql);
  // }

  current({ page, pagesize }) {
    //activity_statuscode=1  (เปิด)
    const ref1 =
      "(SELECT refcode,refvalue FROM sysreference WHERE reftable='activity' and refcolumn='activity_statuscode')";
    const sql = db.format(
      "SELECT activity.*,ref1.refvalue as activity_statusvalue FROM  activity LEFT JOIN " +
        ref1 +
        " ref1 ON activity.activity_statuscode=ref1.refcode WHERE activity_statuscode like ? LIMIT ?,?",
      [1, (page - 1) * pagesize, pagesize]
    );
    console.log(sql);
    return db.query(sql);
  }

  countfilter({ keyword }) {
    const sql = db.format(
      "SELECT count(*) as value FROM activity WHERE activity_name like ?",
      ["%" + keyword + "%"]
    );
    return db.execute(sql);
  }

  countCurrent({ keyword }) {
    const sql = db.format(
      "SELECT count(*) as value FROM activity WHERE activity_name like ?",
      ["%" + keyword + "%"]
    );
    return db.execute(sql);
  }

  getRegisterUsers({ id }) {
    const user_columns =
      ",username,studentcode,msuid,email,displayname,prefixname,fname,mname,sname,faculty_id,faculty_name";
    const sql = db.format(
      "SELECT register.*" +
        user_columns +
        " FROM register LEFT JOIN user ON register.user_id=user.user_id WHERE activity_id=?",
      [id]
    );
    return db.query(sql);
  }

  getuseractivity({ id }) {
    const sql = db.format(
      "SELECT * FROM register LEFT JOIN activity ON register.activity_id=activity.activity_id WHERE user_id=?",
      [id]
    );
    console.log(sql);
    return db.query(sql);
  }

  getnextseq({ code }) {
    let c = code.substring(0, 8) + "%";
    const sql = db.format(
      "SELECT max(activity.activity_seq_term)+1 as nextseq FROM activity WHERE activity.activity_code like ?",
      [c]
    );
    console.log(sql);
    return db.query(sql);
  }

  updatePoster({ id, filename, caption }) {
    const sql = db.format(
      "UPDATE activity set activity_poster=?,activity_caption=? where activity_id=?",
      [filename, caption, id]
    );
    console.log(sql);
    return db.execute(sql);
  }

  updateregostercounter({activity_id}){
    const sql = db.format(
      "UPDATE activity set activity_register=activity_register+1 where activity_id=?",
      [activity_id]
    );
    console.log(sql);
    return db.execute(sql);
  }

  isregisterfull(activity_id){
    const sql = db.format("select activity_register>=activity_receive as isfull from activity where activity_id=? ",[activity_id]);
    console.log(sql);
    return db.execute(sql);
  }

} //class

const ClassModel = new _class();
module.exports = ClassModel;
