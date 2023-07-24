import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TestUploadComponent } from './pages/test-upload/test-upload.component';
import { TestQrcodeComponent } from './pages/test-qrcode/test-qrcode.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    BreadcrumbComponent,
    UserProfileComponent,
    TestUploadComponent,
    TestQrcodeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    BreadcrumbComponent,
  ]
})
export class ThemeModule { }
