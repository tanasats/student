import { IMenuItem } from "src/app/core/interface/menuitem";

export const admin_menu_items: IMenuItem[] = [
  {
    path: 'admin/dashboard',
    title: 'หน้าหลัก',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '',
    title: 'รายการกิจกรรม',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    submenu: [
      {
        path: 'admin/activity',
        title: 'จัดการกิจกรรม',
        icon: 'bi bi-bell',
        class: '',
        extralink: false,
        submenu: [], 
      },
      {
        path: 'admin/checkin',
        title: 'บันทึกเข้าร่วม ด้วย QR Code',
        icon: 'bi bi-qr-code',
        class: '',
        extralink: false,
        submenu: [], 
      },

    ], 
  },
  {
    path: '',
    title: 'จัดการข้อมูล',
    icon: 'bi bi-gear',
    class: '',
    extralink: false,
    submenu: [
      {
        path: 'admin/activitytype',
        title: 'ประเภทกิจกรรม',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'admin/agency',
        title: 'องค์กรที่จัดกิจกรรม',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'admin/faculty',
        title: 'คณะหน่วยงาน',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'admin/user',
        title: 'ผู้ใช้งาน',
        icon: 'bi bi-person',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'admin/setting',
        title: 'ตั้งค่าระบบ',
        icon: 'bi bi-gear',
        class: '',
        extralink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'ทดสอบ',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: [
      {
        path: 'admin/transcript/preview',
        title: 'ตัวอย่าง Transcript',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      // {
      //   path: 'test',
      //   title: 'Test UI',
      //   icon: 'bi bi-patch-check',
      //   class: '',
      //   extralink: false,
      //   submenu: [],
      // },
      // {
      //   path: 'testchart',
      //   title: 'Test Chart',
      //   icon: 'bi bi-patch-check',
      //   class: '',
      //   extralink: false,
      //   submenu: [],
      // },
      // {
      //   path: 'testupload',
      //   title: 'Test Upload',
      //   icon: 'bi bi-patch-check',
      //   class: '',
      //   extralink: false,
      //   submenu: [],
      // },   
      // {
      //   path: 'testqrcode',
      //   title: 'Test QR Code',
      //   icon: 'bi bi-patch-check',
      //   class: '',
      //   extralink: false,
      //   submenu: [],
      // },            
      // {
      //   path: '404',
      //   title: 'Test 404',
      //   icon: 'bi bi-patch-check',
      //   class: '',
      //   extralink: false,
      //   submenu: [],
      // },

    ],
  },
];

export const student_menu_items: IMenuItem[] = [
    {
      path: 'student/dashboard',
      title: 'หน้าหลัก',
      icon: 'bi bi-speedometer2',
      class: '',
      extralink: false,
      submenu: [],
    }, 
    {
      path: 'student/activity',
      title: 'รายการกิจกรรม',
      icon: 'bi bi-calendar',
      class: '',
      extralink: false,
      submenu: [],
    },
    // {
    //   path: 'student/activity-report',
    //   title: 'บันทึกเข้าร่วม',
    //   icon: 'bi bi-patch-check',
    //   class: '',
    //   extralink: false,
    //   submenu: [
    //     {
    //       path: 'student/xxx',
    //       title: 'เข้าร่วมกิจกรรมด้วย บัตรกิจกรรม',
    //       icon: 'bi bi-calendar',
    //       class: '',
    //       extralink: false,
    //       submenu: [],
    //     },
    //     // {
    //     //   path: 'student/xxx',
    //     //   title: 'รายการกิจกรรม',
    //     //   icon: 'bi bi-calendar',
    //     //   class: '',
    //     //   extralink: false,
    //     //   submenu: [],
    //     // },
    //   ],
    // },
    
    // {
    //   path: 'student/checkcredit',
    //   title: 'ตรวจสอบจบ',
    //   icon: 'bi bi-calendar',
    //   class: '',
    //   extralink: false,
    //   submenu: [],
    // },

  ];


  export const officer_menu_items: IMenuItem[] = [
    {
      path: 'officer/dashboard',
      title: 'หน้าหลัก',
      icon: 'bi bi-speedometer2',
      class: '',
      extralink: false,
      submenu: [],
    }, 
    {
      path: '',
      title: 'กิจกรรม',
      icon: 'bi bi-bell',
      class: '',
      extralink: false,
      submenu: [
        {
          path: 'officer/activity',
          title: 'จัดการกิจกรรม',
          icon: 'bi bi-bell',
          class: '',
          extralink: false,
          submenu: [], 
        },
      ]
    }

  ];
