import { Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/component/appointment/appointment.component';
import { ListAppointmentMechanicComponent } from './appointment/component/list-appointment-mechanic/list-appointment-mechanic.component';
import { ListAppointmentComponent } from './appointment/component/list-appointment/list-appointment.component';
import { ManagerDashboardComponent } from './appointment/component/manager-dashboard/manager-dashboard.component';
import { MechanicWorkListComponent } from './appointment/component/mechanic-work-list/mechanic-work-list.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/component/login/login.component';
import { SubscriptionComponent } from './user/component/subscription/subscription.component';

export const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path:'customer/appointment',component: AppointmentComponent, canActivate: [AuthGuard] },
  {path:'customer/list-appointment',component: ListAppointmentComponent, canActivate: [AuthGuard] },
  {path:'mechanic/list-appointment',component: ListAppointmentMechanicComponent, canActivate: [AuthGuard] },
  {path:'mechanic/appointment',component: MechanicWorkListComponent, canActivate: [AuthGuard] },
  {path:'manager/appointment',component: ManagerDashboardComponent, canActivate: [AuthGuard] },
  {path:'appointment', component: AppointmentComponent, canActivate: [AuthGuard]  },
  {path:'login', component: LoginComponent },
  {path:'subscription', component: SubscriptionComponent },
  { path: '404', component:  PageNotFoundComponent}, 
  { path: '**', redirectTo: '/404' }
];
