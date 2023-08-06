const db = require("../config/db");

class _class { 

  getall() {
    let sql = db.format("SELECT * FROM ticket order by cdate");
    return db.execute(sql);
  }
  getById({id=''}) {
    let sql = db.format("SELECT * FROM ticket WHERE activity_id = ?", [id]);
    console.log(sql);
    return db.execute(sql);
  }
  filter({page,pagesize,keyword}){
    let sql = db.format("SELECT * FROM  ticket WHERE activity_id like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    return db.query(sql);
  }
  countfilter({keyword}) {
    let sql = db.format("SELECT count(*) as value FROM ticket WHERE activity_name like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  create({ datas }) {
    let sql = db.format("INSERT INTO ticket SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    let sql = db.format("UPDATE ticket SET ? WHERE ticket_id=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    let sql = db.format("DELETE FROM ticket WHERE ticket_id=?", [id]);
    return db.execute(sql);
  }

}//class

let ClassModel = new _class();
module.exports = ClassModel;
