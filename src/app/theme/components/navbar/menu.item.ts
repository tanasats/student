import { IMenuItem } from "src/app/core/interface/menuitem";

export const admin_menu_items: IMenuItem[] = [
  {
    path: 'admin/dashboard',
    title: 'แผงควบคุม',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '',
    title: 'ตั้งค่า',
    icon: 'bi bi-gear',
    class: '',
    extralink: false,
    submenu: [
      {
        path: 'admin/activity',
        title: 'รายการกิจกรรม',
        icon: 'bi bi-bell',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'admin/user',
        title: 'ผู้ใช้งาน',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'admin/acttype',
        title: 'ประเภทกิจกรรม',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'admin/actorganization',
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
        path: 'test',
        title: 'Test UI',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'testchart',
        title: 'Test Chart',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: '404',
        title: 'Test 404',
        icon: 'bi bi-patch-check',
        class: '',
        extralink: false,
        submenu: [],
      },

    ],
  },
];

export const student_menu_items: IMenuItem[] = [
    {
      path: 'student/dashboard',
      title: 'แผงควบคุม',
      icon: 'bi bi-speedometer2',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'student/calendar',
      title: 'ปฎิทินกิจกรรม',
      icon: 'bi bi-calendar',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'student/activity-report',
      title: 'รายงานกิจกรรม',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: [],
    },

  ];
