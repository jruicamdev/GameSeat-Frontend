import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SuccessComponent } from './views/payments/success/success.component';
import { CanceledComponent } from './views/payments/canceled/canceled.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('././views/home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('././views/login/login.component').then((x) => x.LoginComponent),
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import('././views/reservations/reservations.component').then((x) => x.ReservationsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('././views/profile/profile.component').then((x) => x.ProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('././views/admin/admin.component').then((x) => x.AdminComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'payment-success',
    component: SuccessComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'payment-cancel',
    component: CanceledComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
