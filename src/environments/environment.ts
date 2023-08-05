// export const environment = {
//     production: false,
//     title: 'Local Environment Heading',
//     apiMSUAuth: 'https://data.msu.ac.th/api/v1/auth',
//     apiURL: 'http://10.22.1.252:3000',
//     imgURL: 'http://10.22.1.252:3000/api/v1/files/',
//   };
export const environment = {
    production: false,
    environmentName: "development",
    version:'Developer', 
    endpoint: "http://localhost:3000/api", // common setting
    fileuri:"http://localhost:3000/api/",
    //endpoint: "https://activity.msu.ac.th/api/sas",
    //endpoint: "http://192.168.1.42:3000/api", // common setting
    msuauthapi: "https://data.msu.ac.th/api/v1.1/auth",
  
    appFullName:"ระบบกิจกรรมนิสิต มหาวิทยาลัยมหาสารคาม",
    appFullName_en:"Student Activity System",
    appShortName:"Student Activity",
    appShortName_en:"Student Activity",
    
    ROLE_NAME: {
        10: 'ผู้ใช้งานทั่วไป',
        20: 'เจ้าหน้าที่',
        30: 'ผู้บริหาร',
        99: 'ผู้ดูแลระบบ', 
      },

    ENROLL_POSITION: {
        E: 'ผู้เข้าร่วมโครงการ',
        A: 'ผู้บริหาร'
    }
    
  };

  export const APPLABEL={
    SAVE_SUCCESS:'บันทึกข้อมูลเรียบร้อย',
    SAVE_ERROR:'เกิดข้อผิดพลาด! ',
    DELETE_SUCCESS:'ลบข้อมุลเรียบร้อย',
    DELETE_ERROR:'เกิดข้อผิดพลาด! ',
    UPDATE_SUCCESS:'แก้ไขข้อมูลเรียบร้อบ',
    UPDATE_ERROR:'เกิดข้อผิดพลาด! ',

  }

  export const APPCONST={
    ENROLL_POSITION:[
      {id:'A',name:'ผู้รับผิดชอบโครงการ'},
      {id:'B',name:'ผู้ดำเนินโครงการ'},        
      {id:'C',name:'ผู้เข้าร่วมกิจกรรม'},
    ],
    SKILL:[
      {skill_id:1,skill_code:'S1',skill_name:'ทักษะการปรับตัว มีมนุษยสัมพันธ์ การทำงานร่วมกับผู้อื่น',checked:false},
      {skill_id:2,skill_code:'S2',skill_name:'ทักษะการคิดเชิงวิเคราะห์ การตัดสินใจ การคาดการณ์อนาคต',checked:false},
      {skill_id:3,skill_code:'S3',skill_name:'ทักษะด้านวุฒิภาวะ ความฉลาดทางอารมณ์',checked:false},
      {skill_id:4,skill_code:'S4',skill_name:'ทักษะด้านความคิดสร้างสรรค์ การสร้างวิธีคิดที่เปิดกว้าง ยืดหยุ่น',checked:false},
      {skill_id:5,skill_code:'S5',skill_name:'ทักษะด้านภาวะผู้นำ',checked:false},
    ],
    FACULTY_GROUP:[
      {id:1,name:'วิทยาศาสตร์และเทคโนโลยี'},
      {id:2,name:'วิทยาศาสตร์สุขภาพ'},
      {id:3,name:'มนุษยศาสตร์และสังคมศาสตร์'},
      {id:4,name:'สนันสนุนการเรียนการสอน'},
    ],
  }
