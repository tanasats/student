import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {path:'',component:DefaultPageComponent,
children:[
  {path:'dashboard', component:DashboardComponent,data:{'title':'นิสิต'}},

  

  {path:'',redirectTo:'dashboard',pathMatch:'full'}
]}
]; //Routes

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
