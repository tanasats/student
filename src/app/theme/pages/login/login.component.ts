import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsuAuthService } from 'src/app/service/msu-auth.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isloading:boolean=false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msuauth: MsuAuthService,
    private auth: AuthService,
    private currentuser: CurrentUserService,
    private userservice: UserService,
    private toaster: ToasterService
  ) {}
  public frmLogin: FormGroup = this.fb.group({
    username: ['6310197', [Validators.required, Validators.minLength(3)]],
    password: ['1449900889660', Validators.required],
  });

  onSubmit(form: FormGroup) {
    this.isloading=true;
    this.auth.signin(form.value).subscribe({
      next: (res) => {
        if (res.access_token) {
          localStorage.setItem('access-token', res.access_token);
          this.auth.me().subscribe({
            next: ([res]) => {
              console.log('auth.me() res:', res);
              const userdata = res;
              this.currentuser.login(userdata);
              this.toaster.show('success', 'ยินดีต้อนรับ เข้าใช้งานระบบ');
              this.router.navigate(['/']);
            },
            // error: (err) => {
            //   console.log('auth.me() err:', err);
            // },
          });
        }
      },
      error: (err) => {
        console.log('auth.signin() err:', err);
        switch (err) {
          case "0":
            this.toaster.show('error', 'ผู้ใช้ยังไม่ได้สมัครสมาชิก !!!');
            break;
          case "1":
            this.toaster.show('error', 'รหัสผ่านผิด !!!');
            break;
          default:
            //this.toaster.show('error', err,7000);
            this.toaster.show('error', "เกิดข้อผิดพลาดใหการติดต่อ API Server",7000);
        }
        this.isloading=false; 
      },
    });
  }

  //*********************************************************** */

  // onSubmit(form: FormGroup) {
  //   if (form.valid) {
  //     const authdatas = form.getRawValue();
  //     this.auth.signin(authdatas).subscribe({
  //       next: (res) => {
  //         //app authen success
  //         console.log('app signin res:', res);
  //         if (res.access_token) {
  //           localStorage.setItem('access-token', res.access_token);
  //           const token = res.access_token;
  //           this.auth.me().subscribe({
  //             next: ([res]) => {
  //               this.currentuser.login(token, res);
  //               this.toaster.show('success', 'ยินดีต้อนรับ เข้าใช้งานระบบ');
  //               this.router.navigate(['/']);
  //             },
  //             error: (err) => {
  //               this.toaster.show('error', err);
  //             },
  //           });
  //         }
  //       },
  //       error: (err) => {
  //         console.log('app sign err:', err);
  //         switch (err) {
  //           case '0':
  //             console.log('username not found in app database');

  //             this.msuauth.signin(authdatas).subscribe({
  //               next: (res) => {
  //                 console.log('msu-auth res:', res);
  //                 if(res.access_token){
  //                   localStorage.setItem("access-token",res.access_token);
  //                   this.msuauth.me().subscribe({
  //                     next:(res)=>{
  //                       console.log("msu-auth.me res:",res);
  //                       //this.toaster.show('success', 'username not found in app database');
  //                       this.auth.register(res).subscribe({
  //                         next:(res)=>{
  //                           console.log("register res:",res);
  //                         },
  //                         error:(err)=>{
  //                           console.log("register err:",err);
  //                         }
  //                       })
  //                     },
  //                     error:(err)=>{
  //                       console.log("msu-auth.me err:",err);
  //                     }
  //                   })
  //                 }
  //               },
  //               error: (err) => {
  //                 console.log('msu-auth err:', err);
  //               },
  //             });

  //             break;
  //           case '1':
  //             this.toaster.show(
  //               'error',
  //               'username already in app database but invalid password'
  //             );
  //             break;
  //           case '2':
  //             console.log(
  //               'username already but password=null in app database.'
  //             );
  //             // ส่งไป msu-autn.signin() ถ้าผ่าน set app password
  //             this.msuauth.signin(authdatas).subscribe({
  //               next:(res)=>{
  //                 if(res.access_token){
  //                   localStorage.setItem("access-token",res.access_token);
  //                   this.msuauth.me().subscribe({
  //                     next:(res)=>{
  //                       console.log("msu-auth.me res:",res);
  //                       this.userservice.update(authdatas).subscribe({
  //                         next:(res)=>{
  //                           console.log("update app db res:",res);

  //                         },
  //                         error:(err)=>{
  //                           console.log("update app db err:",err);
  //                         }
  //                       })

  //                     },
  //                     error:(err)=>{
  //                       console.log("msu-auth.me err:",err);
  //                     }
  //                   })
  //                 } // if access_token

  //               },
  //               error:(err)=>{
  //                 this.toaster.show('error','username หรือ password ไม่ถูกต้อง');
  //               }
  //             }); //msuauth.signin
  //             break;
  //         }
  //       },
  //     });
  //   }
  // }

  private msuauthen(userauth: any) {
    return new Promise<any>((resolve) => {
      this.delay(3000).then(() => {
        return resolve('tanasat');
      });
    });
  }

  // private _authenMSU(authdata: any) {
  //   return new Promise((resolve, reject) => {
  //     this.msuauth.signin(authdata).subscribe({
  //       next: (res) => {
  //         if (res.access_token) {
  //           localStorage.setItem('access-token', res.access_token);
  //           this.msuauth.me().subscribe({
  //             next: (res) => {
  //               resolve(res);
  //             },
  //             error: (err) => {
  //               reject([]);
  //             },
  //           });
  //         }
  //       },
  //       error: (err) => {
  //         reject([]);
  //       },
  //     });
  //   });
  // }

  // onSubmit(form: FormGroup) {
  //   if (form.valid) {
  //     // console.log('form submit Login', form.value);
  //     this.msuauth.signin(form.value).subscribe({
  //       next: (res) => {
  //         // 1.AD MSU Signin success
  //         console.log('msu-auth res:', res);
  //         if (res.access_token) {
  //           let accesstoken = res.access_token; //<-- res.access_token is msu-auth token
  //           localStorage.setItem('access-token', accesstoken);
  //           this.msuauth.me().subscribe({
  //             next: (res) => {
  //               // 2.Get MSU user information success
  //               // console.log('me:', res);
  //               const msu_me_info = res;
  //               this.auth.signin(form.value).subscribe({
  //                 next:(res)=>{
  //                   console.log("app signin res:",res);
  //                 },
  //                 error:(err)=>{
  //                   console.log("app signin err:",err)
  //                   // err=0 when username not found in app database.
  //                   // err=1 when username already in app database but invalid password.
  //                   // err=2 when username already but no password in app database.
  //                   switch(err){
  //                     case "0":
  //                       console.log("register new user");
  //                       break;
  //                     case "1":
  //                       console.log("invalid password throw error or try to change password");
  //                       break;
  //                     case "2":
  //                       console.log("already username but no password try to set passwod");
  //                       break;
  //                   }

  //                 }
  //               })

  //             },
  //             error: (err) => {
  //               // Get MSU user information error
  //               // console.log(err);
  //               this.toaster.show('error', err);
  //             },
  //           });
  //         }
  //       },
  //       error: (err) => {
  //         // AD MSU Sign Error
  //         // console.log(err);
  //         this.toaster.show('error', err);
  //       },
  //     });
  //   }
  // }

  private delay(ms: number) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
} // class
