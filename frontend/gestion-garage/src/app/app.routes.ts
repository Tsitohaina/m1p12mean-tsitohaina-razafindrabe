import { Routes } from '@angular/router';
import { LoginComponent } from './user/component/login/login.component';
import { SubscriptionComponent } from './user/component/subscription/subscription.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'subscription', component: SubscriptionComponent },
];
