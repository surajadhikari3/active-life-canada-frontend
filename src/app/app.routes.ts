import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import {SignupComponent} from './auth/signup/signup.component';
import {LandingComponent} from './landing/landing/landing.component';
import {LoginTwoFaComponent} from './auth/login-two-fa/login-two-fa.component';


export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login2FA', component: LoginTwoFaComponent },
  // { path: 'courses', component: CourseListComponent, canActivate: [authGuard] },
  // { path: 'users/:id', component: UserDetailsComponent, canActivate: [authGuard] }
];
