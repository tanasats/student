const db = require("../config/db");

class _class { 
   activity_field_guest = [
    "activity_id",
    "activity_code",
    "activity_year",
    "activity_term",
    "activity_seq_term",
    "agency_code",
    "activitytype_code",
    "activity_category_id",
    "activity_name",
    "activity_description",
    "activity_date_from",
    "activity_date_to",
    "activity_hour",
    "activity_place",
    "activity_receive",
    "activity_register",
    "activity_skill",
    "activity_faculty",
    //"activity_budget_source",
    //"activity_budget",
    //"activity_budget_paid",
    //"xactivity_register_online",
    "activity_register_from",
    "activity_register_to",
    "activity_open",
    "activity_ticket",
    "activity_docfiles",
    "activity_picture",
    "activity_status",
    "activity_publish",
    "activity_publish_date_from",
    "activity_publish_date_to",
    "faculty_id",
    "faculty_name",
    "cowner",
    "mowner",
    "cdate",
    "mdate"
  ];

  activity() {
    let sql = db.format("SELECT "+this.activity_field_guest.join()+" FROM activity where activity_publish=1");
    console.log(sql)
    return db.execute(sql);
  }
  
}//class

let ClassModel = new _class();
module.exports = ClassModel;
