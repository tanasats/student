import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './theme/pages/home/home.component';

import { LoginComponent } from './theme/pages/login/login.component';
import { PageNotFoundComponent } from './theme/pages/page-not-found/page-not-found.component';
import { TestChartComponent } from './theme/pages/test-chart/test-chart.component';
import { TestComponent } from './theme/pages/test/test.component';
import { ActivityDetailComponent } from './shared/components/activity/activity-detail/activity-detail.component';
import { UserProfileComponent } from './theme/pages/user-profile/user-profile.component';
import { TestUploadComponent } from './theme/pages/test-upload/test-upload.component';
import { TestQrcodeComponent } from './theme/pages/test-qrcode/test-qrcode.component';
import { AuthGuard } from './service/auth.guard';
import { ActivityComponent } from './pages/activity/activity.component';


const routes: Routes = [

  {path:'',redirectTo:'guest',pathMatch:'full'},   
  //{path:'home',component:HomeComponent,data: { breadcrumb: '' }},
  
  {path:'activity',component:ActivityComponent},
  
  
  
  {path:'login',component:LoginComponent,data: { breadcrumb: '' }},
  //{path:'activity/:id',component:ActivityDetailComponent,pathMatch:'full',data: { breadcrumb: 'รายละเอียดกิจกรรม' }},
  {path:'guest',
    loadChildren: () => import('./userroles/guest/guest-routing.module').then(m=> m.GuestRoutingModule),data:{title:'ผู้ใช้ทั่วไป'}
  },
  {path:'admin',
    // loadChildren: () => import('./features/admin/admin-routing.module').then(m => m.AdminRoutingModule),data:{title:'ผู้ดูแลระบบ'}
    loadChildren: () => import('./userroles/admin/admin-routing.module').then(m => m.AdminRoutingModule),canActivate:[AuthGuard],data:{activateroles: ['admin'],title:'ผู้ดูแลระบบ'}
  },  
  {path:'student',
    loadChildren: () => import('./userroles/student/student-routing.module').then(m=>m.StudentRoutingModule),canActivate:[AuthGuard],data:{activateroles: ['student'],title:'นิสิต'}
  },
  {path:'officer',
    loadChildren: () => import('./userroles/officer/officer-routing.module').then(m=>m.OfficerRoutingModule),canActivate:[AuthGuard],data:{activateroles: ['officer','admin'],title:'เจ้าหน้าที่'}
  },

  //test-------------
  {path:'test',component:TestComponent,data: { breadcrumb: 'Test' }}, 
  {path:'testchart',component:TestChartComponent,data: { breadcrumb: 'Test Chart' }},
  {path:'testqrcode',component:TestQrcodeComponent,data: { breadcrumb: 'Test QR Code' }},
  {path:'testupload',component:TestUploadComponent,data: { breadcrumb: 'Test Upload' }},
  {path:'page-not-found',component:PageNotFoundComponent,data: { breadcrumb: 'page not found !!' }},
  {path:'user-profile',component:UserProfileComponent},
  {path:'**',redirectTo:'/page-not-found'}




];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  //imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
