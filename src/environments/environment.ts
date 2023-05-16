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
    version:'0.5',
    endpoint: "http://localhost:3000/api", // common setting
    msuauthapi: "https://data.msu.ac.th/api/v1.1/auth",

    appFullName:"ระบบทรานสคริปกิจกรรมนิสิต มหาวิทยาลัยมหาสารคาม",
    appFullName_en:"Student Activity Transcript System",
    appShortName:"SATs",
    appShortName_en:"SATs",
    
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