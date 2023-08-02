export interface ICurrentuser {
    is_login:boolean,
    user_id:number,
    username:string,
    studentcode:string,
    fullname:string,
    faculty_id:number,
    faculty_name:string, 
    email:string,
    role:{
        role_id:number,
        role_name:string
    },
    roles:{
        role_id:number,
        role_name:string
    }[],
}