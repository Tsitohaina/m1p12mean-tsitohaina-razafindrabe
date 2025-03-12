import { Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './user/component/login/login.component';
import { SubscriptionComponent } from './user/component/subscription/subscription.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard]  },
];
