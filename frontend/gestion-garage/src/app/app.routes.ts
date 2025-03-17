import { Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/component/appointment/appointment.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './user/component/login/login.component';
import { SubscriptionComponent } from './user/component/subscription/subscription.component';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'customer/appointment',component: AppointmentComponent, canActivate: [AuthGuard] },
  {path:'mechanic/mechanic',component: AppointmentComponent, canActivate: [AuthGuard] },
  {path:'manager/manager',component: AppointmentComponent, canActivate: [AuthGuard] },
  {path:'login', component: LoginComponent },
  {path:'subscription', component: SubscriptionComponent },
  {path:'appointment', component: AppointmentComponent, canActivate: [AuthGuard]  },
];
