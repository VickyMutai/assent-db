import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from  './auth/login/login.component';
import { RegisterComponent } from  './auth/register/register.component';
import { ForgotPasswordComponent } from  './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from  './auth/verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';
import { WorkingComponent } from './working/working.component'

const routes: Routes = [
  { path:  '',component:  LoginComponent},
  { path:  'register', component:  RegisterComponent },
  { path:  'forgot-password', component:  ForgotPasswordComponent },
  { path:  'verify-email', component:  VerifyEmailComponent },
  { path:  'home', component: HomeComponent},
  { path: 'trial', component:WorkingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
