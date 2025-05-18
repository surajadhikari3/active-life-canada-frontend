import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {LoginTwoFaComponent} from './auth/login-two-fa/login-two-fa.component';
import {LayoutComponent} from './layout';
import {CourseListComponent} from './courses/course-list/course-list.component';
import {CourseDetailsComponent} from './courses/course-details/course-details.component';
import {authGuard} from './auth/auth.guard';
import {DashboardLayoutComponent} from './dashboard/dashboard-layout.component';
import {HomeDashboardComponent} from './dashboard/home-dashboard.component';
import {FamilyMemberComponent} from './dashboard/family-member.component';


export const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login2FA', component: LoginTwoFaComponent },
      { path: 'courses', component: CourseListComponent,  canActivate: [authGuard] },
      { path: 'courses/details', component: CourseDetailsComponent,  canActivate: [authGuard] },
      {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [
          { path: 'home', component: HomeDashboardComponent },
          { path: 'family', component: FamilyMemberComponent },
        //   { path: 'course-registration', component: RegisteredCourseComponent },
        //   { path: 'cart', component: CartDrawerComponent }
        ]
      }

    ]
  }
];
