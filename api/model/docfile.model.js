const db = require("../config/db");

class _class { 

  getall() {
    let sql = db.format("SELECT * FROM docfile");
    return db.execute(sql);
  }
  getbyId({id = ""}) {
    let sql = db.format("SELECT * FROM docfile WHERE docfile_id = ?", [id]);
    return db.execute(sql);
  }
  getbyTable({ref_table_name="",ref_table_id="",ref_user_id=""}) {
    let sql = db.format("SELECT * FROM docfile WHERE docfile_ref_table_name = ? and docfile_ref_table_id=? and docfile_ref_user_id=?", [ref_table_name,ref_table_id,ref_user_id]);
    console.log(sql);
    return db.execute(sql);
  }
  
  filter({page,pagesize,keyword}){
    let sql = db.format("SELECT * FROM  docfile WHERE docfile_name like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    return db.query(sql);
  }
  countfilter({keyword}) {
    let sql = db.format("SELECT count(*) as value FROM docfile WHERE docfile_name like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  create({ datas }) {
    let sql = db.format("INSERT INTO docfile SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    let sql = db.format("UPDATE docfile SET ? WHERE docfile_id=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    let sql = db.format("DELETE FROM docfile WHERE docfile_id=?", [id]);
    return db.execute(sql);
  }

}//class

let ClassModel = new _class();
module.exports = ClassModel;
